// export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(request: Request) {
    return Response.json({ name: "Hello" });
}