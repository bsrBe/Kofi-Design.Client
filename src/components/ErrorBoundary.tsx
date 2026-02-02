import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        const handleClearAndReload = () => {
            localStorage.clear();
            window.location.href = '/';
        };

        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8 text-center">
                    <div className="max-w-md flex flex-col gap-6">
                        <h1 className="text-white text-3xl font-bold">Something went wrong</h1>
                        <p className="text-white/60 text-sm">
                            The application encountered an unexpected error.
                            <br />
                            <code className="block mt-4 p-4 bg-black/40 rounded text-red-400 text-xs overflow-auto">
                                {this.state.error?.message}
                            </code>
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-primary text-white py-3 px-8 rounded-xl font-bold uppercase tracking-widest text-sm"
                            >
                                Reload Application
                            </button>
                            <button
                                onClick={handleClearAndReload}
                                className="text-white/40 hover:text-white/60 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                Clear All Data & Reset
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
