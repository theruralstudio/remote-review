import FirebaseProvider from '../utils/firebase';

export default function BasicLayout({children}) {
  return (
    <div id="full-page" className="flex w-full h-full overflow-hidden bg-gray-200">
      <FirebaseProvider>
        {children}
      </FirebaseProvider>
    </div>
  )
}