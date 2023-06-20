const Header = () => {
  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1 pl-5 text-3xl font-bold">
            {'Test user'}
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => {
                console.log('Sign out not implemented')
              }}
            >
              <div className="w-10 rounded-full">
                <img src="https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=1800&t=st=1681666122~exp=1681666722~hmac=baacb883735b7b047695c84b6d84062bcf30ed639108cc788277ab9868df4676" alt="Test user" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
