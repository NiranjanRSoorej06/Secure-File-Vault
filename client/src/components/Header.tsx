type Props = {
  onLogout: () => void;
};
function Header({ onLogout }:Props){
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center",
                marginBottom:"20px",
            }}
        >
            <h2 className="text-4xl font-bold">
                Secure File Vault
            </h2>

            <button
                onClick={onLogout}
                className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            >
                Logout
            </button>
        </div>
    );
}

export default Header;