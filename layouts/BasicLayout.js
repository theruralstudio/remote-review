import FirebaseProvider from '../utils/firebase';

export default ({children, reviewChildren, view, open, toggleOpen}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className={`flex ${open ? 'md:w-5/12 lg:w-4/12 xl:w-3/12' : 'w-0 invisible'} px-2 z-10`}>
              <div className="flex-grow bg-white border-2 border-black">
                { children }
              </div>
            </div>
            <div className={`flex ${open ? 'md:w-7/12 lg:w-8/12 xl:w-9/12' : 'w-full'} flex-grow px-2 h-full`}>
              { reviewChildren }
            </div>
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}