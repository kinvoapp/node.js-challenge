export function errorHandler(error: any): { status?: number, errorData?: string[] } {
    const { error: { status } } = error
    if (status) {
        return { status, errorData: error }
    }
    return {}
}