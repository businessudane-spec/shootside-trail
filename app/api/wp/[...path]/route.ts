import { NextRequest, NextResponse } from 'next/server';
import http from 'http';
import https from 'https';

const WP_HOST_IP = '69.57.172.207';
const WP_DOMAIN = 'shootside.in';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path, 'POST');
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path, 'PUT');
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(request, resolvedParams.path, 'DELETE');
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

function doHttpRequest(
  options: http.RequestOptions,
  bodyData: Buffer | null
): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode || 200,
          headers: res.headers,
          body: buffer.toString('utf-8')
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error('Connection timed out'));
    });

    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
}

function doHttpsRequest(
  options: https.RequestOptions,
  bodyData: Buffer | null
): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { ...options, rejectUnauthorized: false },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve({
            statusCode: res.statusCode || 200,
            headers: res.headers,
            body: buffer.toString('utf-8')
          });
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error('HTTPS connection timed out'));
    });

    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
}

async function handleProxy(request: NextRequest, pathArray: string[], method: string): Promise<NextResponse> {
  try {
    const subpath = pathArray.join('/');
    const searchParams = request.nextUrl.search;

    let remotePath = '';
    if (subpath.startsWith('wp-json/')) {
      const restPath = subpath.replace(/^wp-json\//, '');
      const separator = searchParams ? '&' : '';
      const cleanParams = searchParams ? searchParams.replace(/^\?/, '') : '';
      remotePath = `/index.php?rest_route=/${restPath}${separator}${cleanParams}`;
    } else {
      remotePath = `/${subpath}${searchParams}`;
    }

    const headers: Record<string, string> = {
      Host: WP_DOMAIN,
      Accept: 'application/json'
    };

    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const contentType = request.headers.get('content-type');
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    let bodyData: Buffer | null = null;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const arrayBuffer = await request.arrayBuffer();
        bodyData = Buffer.from(arrayBuffer);
        headers['Content-Length'] = String(bodyData.length);
      } catch {
        bodyData = null;
      }
    }

    // Attempt 1: Direct IP HTTP on Port 80
    try {
      const res = await doHttpRequest(
        {
          host: WP_HOST_IP,
          port: 80,
          path: remotePath,
          method: method,
          headers: headers,
          timeout: 8000
        },
        bodyData
      );

      return new NextResponse(res.body, {
        status: res.statusCode,
        headers: {
          'Content-Type': (res.headers['content-type'] as string) || 'application/json'
        }
      });
    } catch (httpErr: any) {
      console.warn(`[WP Proxy] HTTP attempt failed (${httpErr?.message || httpErr}), attempting HTTPS fallback...`);

      // Attempt 2: HTTPS Fallback to domain
      try {
        const httpsRes = await doHttpsRequest(
          {
            host: WP_DOMAIN,
            port: 443,
            path: remotePath,
            method: method,
            headers: {
              ...headers,
              Host: WP_DOMAIN
            },
            timeout: 10000
          },
          bodyData
        );

        return new NextResponse(httpsRes.body, {
          status: httpsRes.statusCode,
          headers: {
            'Content-Type': (httpsRes.headers['content-type'] as string) || 'application/json'
          }
        });
      } catch (httpsErr: any) {
        console.error('[WP Proxy] Both HTTP and HTTPS proxy attempts failed:', httpsErr);
        return NextResponse.json(
          {
            success: false,
            message: `WordPress Connection Error: ${httpErr?.message || 'Host unreachable'}. Please verify network connection.`
          },
          { status: 502 }
        );
      }
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: `Proxy Error: ${err.message}` },
      { status: 500 }
    );
  }
}
