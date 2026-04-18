import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-success.html',
  styleUrls: ['./contact-success.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSuccess { }
