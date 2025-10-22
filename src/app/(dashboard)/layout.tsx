import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { BookOpen, Home, Sparkles } from 'lucide-react';

// Conditional UserButton wrapper
function ConditionalUserButton() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // During build, if we don't have a valid key, render a placeholder
  if (!publishableKey || publishableKey.includes('dummy')) {
    return <div className="w-8 h-8 bg-gray-300 rounded-full"></div>;
  }

  return <UserButton />;
}

const DashboadLayout = ({children}) => {
    const links = [
        {href: "/", name: "Home", icon: Home},
        {href: "/journal", name: "Journals", icon: BookOpen},
    ]
    return (
        <div className="h-screen w-screen relative flex bg-gray-50">
            <aside className="h-full w-[240px] bg-white border-r border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h2 className='font-bold text-xl text-gray-900'>IntelliJournal</h2>
                    </div>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {links.map(link =>
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className='flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 group'
                                >
                                    <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="font-medium">{link.name}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="h-[60px] w-full bg-white border-b border-gray-200 shadow-sm">
                   <div className='h-full w-full flex items-center justify-end px-6'>
                        <ConditionalUserButton />
                   </div>
                </header>
                <main className='flex-1 overflow-auto'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboadLayout;