import FirebaseProvider from '../utils/firebase';

export default ({children}) => {
  return (
    <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
      <FirebaseProvider>
        {children}
      </FirebaseProvider>
    </div>
  )
}