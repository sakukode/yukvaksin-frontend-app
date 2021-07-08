
const Navbar = () => {
    return (
        <div>
            <nav className="bg-white py-2 md:py-4">
                <div className="container px-4 mx-auto md:flex md:items-center">

                <div className="flex justify-between items-center">
                    <a href="#" className="font-bold text-xl text-green-600">AYO VAKSIN</a>
                    <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                </div>
            </nav>
        </div>
    );
}
 
export default Navbar;