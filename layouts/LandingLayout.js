import FirebaseProvider from '../utils/firebase';

export default ({children}) => {
  return (
    <FirebaseProvider>
      <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
        <div className="flex w-full h-full p-4">
          <div className="flex flex-grow -mx-2">
            <div className='flex w-full px-2'>
              <div className="flex-grow">
                { children }
              </div>
            </div>
          </div>
        </div>        
      </div>
    </FirebaseProvider>
  )
}