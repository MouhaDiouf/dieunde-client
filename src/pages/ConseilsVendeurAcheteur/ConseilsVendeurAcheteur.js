import {
  Typography,
  Container,
  List,
  ListItem,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles({
  image: {
    width: '50%',
    maxWidth: 200,
    margin: '0 auto',
    display: 'block',
  },
});
function ConseilsVendeurAcheteur() {
  const classes = useStyles();
  return (
    <Container>
      <img
        className={classes.image}
        src="https://res.cloudinary.com/mouhamadou/image/upload/v1611486151/p3nvg7ucrgc41cyzr4rn.jpg"
        alt=""
      />
      <Typography variant="h3">Conseils aux acheteurs</Typography>
      <List>
        <ListItem>
          Inspectez la voiture, de préférence en personne. Méfiez-vous des
          vendeurs qui refusent de vous rencontrer. Soyez prudent si le vendeur
          souhaite communiquer uniquement par e-mail ou SMS.
        </ListItem>
        <ListItem>
          {' '}
          Soyez extrêmement prudent si le vendeur refuse ou prétend ne pas
          pouvoir parler au téléphone. Si possible, demandez à un mécanicien
          automobile de vous rejoindre et d'inspecter le véhicule avant de payer
          pour conclure une vente.
        </ListItem>
        <ListItem>
          {' '}
          Faites preuve de prudence si le vendeur déclare que le véhicule doit
          être expédié ou n'est actuellement pas en sa possession physique.
          Évitez les annonces de voitures qui sont trop belles pour être vraies.
          Les publicités pour les voitures de sport et les SUV populaires dont
          le prix est égal à la moitié de leur valeur sont presque toujours des
          leurres utilisés par les escrocs.
        </ListItem>
        <ListItem>
          {' '}
          Consultez l’outil de vérification des prix sur Cars.com pour avoir une
          idée approximative de la valeur d’une automobile avant de répondre à
          une annonce suspecte. Soyez extrêmement prudent avant de transférer
          des dépôts ou des paiements à l'aide de Western Union, MoneyGram, ou
          des services d'entiercement.
        </ListItem>
        <ListItem>
          Le moyen le plus sûr d'acheter une voiture est en personne et dans un
          lieu public. Cependant, si vous devez virer des fonds, assurez-vous de
          vérifier le compte destinataire en contactant directement la banque
          avant de le faire.
        </ListItem>

        <ListItem>
          {' '}
          Bien que les rapports d'historique de véhicule n'incluent pas
          nécessairement toutes les informations sur une voiture d'occasion, ils
          peuvent être un outil utile pour identifier les problèmes ou défauts
          majeurs, l'emplacement général, etc. Cela peut indiquer une fraude
          automobile si le vendeur est incapable ou refuse de fournir le numéro
          d'identification du véhicule ou une copie du titre.
        </ListItem>
      </List>
      <Typography variant="h3"> Conseils aux vendeurs</Typography>
      <List>
        <ListItem>
          {' '}
          Le mieux est de traiter localement: La façon la plus sûre et la plus
          recommandée de traiter est en personne, face à face. Soyez prudent si
          l'acheteur souhaite communiquer uniquement par e-mail ou SMS. Évitez
          les acheteurs qui sont actuellement hors du pays ou qui prétendent
          résider à l'étranger
        </ListItem>
        <ListItem>
          {' '}
          Soyez extrêmement prudent si l'acheteur refuse ou prétend ne pas
          pouvoir parler au téléphone. Évitez les schémas de paiement
          compliqués: En tant que vendeur, vous avez le contrôle. Indiquez
          toujours votre mode de paiement préféré et méfiez-vous d'un processus
          de paiement qui comporte trop d'étapes.{' '}
        </ListItem>
        <ListItem>
          {' '}
          Vérifier le paiement: Ne transférez pas le titre de votre voiture à
          l'acheteur tant que son chèque n'a pas été compensé ou que vous n'avez
          pas reçu le paiement intégral de votre véhicule. N'acceptez jamais un
          chèque d'un montant supérieur au prix demandé. Vous devez toujours
          vérifier l’authenticité de tout chèque de banque ou chèque certifié
          auprès de la banque émettrice.
        </ListItem>
        <ListItem>
          {' '}
          Ne vous fiez pas au numéro de téléphone imprimé sur le chèque;
          recherchez vous-même le numéro de téléphone de la banque émettrice si
          vous prévoyez d'appeler. La banque peut vérifier le numéro
          d'acheminement, le numéro de compte et le nom sur le compte. La banque
          émettrice vérifiera même s'il y a des fonds disponibles pour couvrir
          le montant désigné.
        </ListItem>
      </List>
      <Typography variant="h3"> Autre informations utiles</Typography>
      <List>
        <ListItem>
          {' '}
          Gardez à l'esprit que DakarVoitures.com ne possède, n'achète ni ne
          vend les véhicules listés sur notre site. Nous ne nous impliquons pas
          non plus dans les transactions entre acheteurs et vendeurs. Toute
          correspondance que vous avez concernant un véhicule en particulier se
          produit directement entre vous et le vendeur.
        </ListItem>
        <ListItem>
          Nous ne vous demanderons jamais de fournir des informations
          personnelles ou financières par e-mail. Si vous recevez un e-mail non
          sollicité qui prétend provenir de DakarVoitures.com, contactez-nous
          pour vérifier avant d'entreprendre toute autre action. Cela inclut les
          demandes de informations telles que: Nom d'utilisateur ou mot de passe
          Informations sur le compte bancaire Informations de carte de crédit
          Encore une fois, si vous avez des questions ou plaintes concernant
          quelque chose qui semble suspect, n'hésitez jamais contacter le
          service de prévention de la fraude à fraude@dakarvoitures.com. Nous
          sommes ici pour aider!
        </ListItem>
      </List>
    </Container>
  );
}

export default ConseilsVendeurAcheteur;
