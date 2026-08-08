export function apiError(message: string, code: string, status = 400) {
  return Response.json({ error: message, code }, { status });
}

export function apiSuccess(data: unknown, status = 200) {
  return Response.json(data, { status });
}
