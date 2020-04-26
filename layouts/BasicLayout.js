import FirebaseProvider from '../utils/firebase';

export default ({children, reviewChildren, view, open}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className={`flex ${open ? 'md:w-2/5 lg:w-2/6 xl:w-4/12' : 'w-full'} px-2 z-10`}>
              <div className="flex-grow bg-white border-2 border-black">
                { children }
                {/* <Component {...pageProps}/> */}
              </div>
            </div>
            <div className={`flex ${open ? 'md:w-3/5 lg:w-4/6 xl:w-8/12' : 'w-0'} flex-grow px-2 h-full`}>
            { reviewChildren }
            </div>
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}