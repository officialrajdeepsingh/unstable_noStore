export async function GET() {
    
    let random = Math.random()

    return Response.json({ random })
  }