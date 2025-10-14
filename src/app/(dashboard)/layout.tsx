import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';

const DashboadLayout = ({children}) => {
    const links = [
        {href: "/", name: "Home"},
        {href: "/journal", name: "Journals"},
    ]
    return (
    <div className="h-screen w-screen relative flex">
        <aside className="h-full w-[200px] border-r border-black/20">
            <div>
                <h2 className='font-semibold text-xl px-4 py-4 border-b border-black/20'>Mood</h2>
            </div>
            <ul>
                {links.map(link=> 
                    <li key={link.name} className='text-lg px-4 py-6'>
                        <Link href={link.href}>
                            {link.name}
                        </Link>
                    </li>
                )}
            </ul>
        </aside>
        <div className="w-full h-full">
            <header className="h-[60px] w-full border-b border-black/20">
               <div className='h-full w-full flex items-center justify-end px-5'>
                    <UserButton />
               </div>
            </header>
            <div className='h-[calc(100vh-60px)]'>
                {children}
            </div>
        </div>
    </div>
    )
}

export default DashboadLayout;