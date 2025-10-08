// modular path for logic //
import * as path from 'path';

export function computeRelativePath(fromFsPath: string, toFsPath: string): string {
    const fromDir = path.dirname(fromFsPath);
    let rel = path.relative(fromDir, toFsPath);
    // Normalize forward slashes //
    if (path.sep !== '/') {
        rel = rel.split(path.sep).join('/');
    }
    return rel;
}
