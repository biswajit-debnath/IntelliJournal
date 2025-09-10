import { UserButton } from '@clerk/nextjs'

const DashboadLayout = ({children}) => {
    return (
    <div className="h-screen w-screen relative flex">
        <aside className="h-full w-[200px] border-r border-black/20">
            Mood
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