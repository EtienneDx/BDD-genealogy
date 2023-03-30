require.extensions['.css'] = (): string => '';
require.extensions['.gif'] = (): string => '';
require.extensions['.jpg'] = (): string => '';
require.extensions['.png'] = (): string => '';
require.extensions['.scss'] = (): string => '';

declare module '*.css';
declare module '*.gif';
declare module '*.jpg';
declare module '*.png';
declare module '*.scss';