import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormdaradopcionPage } from './formdaradopcion.page';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { BasedatosService } from 'src/app/services/basedatos.service';
import { Daradopcion } from 'src/app/services/daradopcion.service';

describe('FormdaradopcionPage', () => {
  let component: FormdaradopcionPage;
  let fixture: ComponentFixture<FormdaradopcionPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let basedatosServiceSpy: jasmine.SpyObj<BasedatosService>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    basedatosServiceSpy = jasmine.createSpyObj('BasedatosService', ['abrirBaseDatos', 'agregarSolicitud']);

    await TestBed.configureTestingModule({
      declarations: [FormdaradopcionPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: BasedatosService, useValue: basedatosServiceSpy },
        { provide: Camera, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormdaradopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería detectar campos vacíos', () => {
    component.daradopcion = new Daradopcion(); // Campos vacíos
    expect(component.camposVacios()).toBeTrue();

    component.daradopcion.nombre_persona = 'John Doe';
    component.daradopcion.edad_persona = 30;
    component.daradopcion.telefono = '+56912345678';
    component.daradopcion.nombre_mascota = 'Bobby';
    component.daradopcion.edad_mascota = `${3}`;
    component.daradopcion.vacunas_mascotas = 'Rabia';
    component.daradopcion.problemas_salud = 'Ninguno';
    component.daradopcion.historia_mascota = 'Rescatado';
    expect(component.camposVacios()).toBeFalse();
  });
});
