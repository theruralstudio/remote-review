import FirebaseProvider from '../utils/firebase';

export default ({children, setUser}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className='flex w-full px-2'>
              <div className="flex-grow">
                <div className="flex bg-gray-200 w-full h-full">
                  { children }
                  <div>
                    <div className="line-through text-gray-400 fixed top-0 left-0 m-6">Search</div>
                    <div>
                      <a className="fixed bottom-0 left-0 m-6" href={'http://estudioherreros.com/en/'}>estudio Herreros ↗</a>
                    </div>
                    <div className="line-through text-gray-400 fixed top-0 right-0 m-6">Lang</div>
                    <div className="line-through text-gray-400 fixed bottom-0 right-0 m-6">Contact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}