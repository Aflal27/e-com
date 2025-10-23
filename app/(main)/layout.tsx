import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-white dark:bg-gray-900'>{children}</main>
      <Footer />
    </>
  )
}
