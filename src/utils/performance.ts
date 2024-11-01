export const measurePerformance = (name: string) => {
    const start = performance.now();
    return {
        end: () => {
            const end = performance.now();
            console.log(`${name} took ${end - start}ms`);
        }
    };
}; 