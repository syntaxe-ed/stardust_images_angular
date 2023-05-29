import { Component } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import packageJson from '../../../../package.json'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  date = new Date();
  instagram = faInstagram;
  facebook = faFacebook;
  window = window;
  version = packageJson.version;
}
