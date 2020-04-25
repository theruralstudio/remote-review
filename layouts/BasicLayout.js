import FirebaseProvider from '../utils/firebase';

export default ({children, reviewChildren, view, open}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className={`flex ${open ? 'md:w-2/6 lg:w-2/6 xl:w-4/12' : 'w-full'} px-2 z-10`}>
              <div className="flex-grow bg-white border-2 border-black">
                { children }
                {/* <Component {...pageProps}/> */}
              </div>
            </div>
            { reviewChildren }
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}