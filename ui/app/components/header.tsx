import Github  from "./ui/github";
const Header = () => {
    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <nav className="w-full flex items-center justify-between space-x-4">
                    <div></div>
                    <div>
                    <h1 className="text-xl font-bold">Coding Agent</h1>
                    </div>
                    <div>
                    <Github url="http://github.com/AbhinavTheDev/coding-agent" />
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header;