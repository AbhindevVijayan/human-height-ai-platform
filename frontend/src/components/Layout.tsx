import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8">

                {children}

            </main>

        </div>
    );
};

export default Layout;