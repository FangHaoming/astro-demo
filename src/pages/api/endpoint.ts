export const prerender = false;

interface RequestBody {
  num1: number;
  num2: number;
}

interface SuccessResponse {
  success: true;
  message: string;
  data: {
    sum: number;
  };
}

interface ErrorResponse {
  success: false;
  message: string;
}

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      message: `This is my static endpoint`,
    }),
  );
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    if (!request?.body) {
      throw new Error('Invalid request: missing body');
    }

    const body = await request.json() as RequestBody;
    
    if (!body || typeof body.num1 !== 'number' || typeof body.num2 !== 'number') {
      throw new Error('Invalid request: num1 and num2 must be numbers');
    }

    const { num1, num2 } = body;
    const sum = num1 + num2;

    const response: SuccessResponse = {
      success: true,
      message: `The sum of ${num1} and ${num2} is ${sum}`,
      data: { sum }
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: error instanceof Error ? error.message : '请求处理失败'
    };

    return new Response(
      JSON.stringify(errorResponse),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}