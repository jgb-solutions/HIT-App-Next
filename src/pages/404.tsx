import MainLayout from '../components/layouts/Main'
import SEO from '../components/SEO'
import Link from '../components/Link'
import Hidden from '@material-ui/core/Hidden'

export default function AllNews() {
  return (
    <MainLayout title="À Propos">
      <SEO title="À Propos" />

      <div className="content react-transition flip-in-y" style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ion-text-center">
          <h1>Page non trouvée.</h1>
          <h2>Êtes-vous perdu ? <Hidden smUp><br /></Hidden><Link href="/"><a style={{ color: 'white' }}>Retournez sour la page d'accueil.</a></Link></h2>
        </div>
      </div>
    </MainLayout>
  )
}