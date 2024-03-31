import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import { HomeComponent } from './pages/home/home.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { MealInfoComponent } from './pages/home/meal-info/meal-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MealInfoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        provideStorage(() => getStorage()),
        AngularFireDatabaseModule,
        MatToolbar,
        MatIcon,
        MatIconButton,
        MatButton,
        MatFormField,
        MatLabel,
        MatStepLabel,
        MatInput,
        ReactiveFormsModule,
        MatStep,
        MatStepper,
        MatStepperPrevious,
        MatStepperNext,
        MatRadioGroup,
        MatRadioButton,
        MatSelect,
        MatOption,
        MatTooltip,
        MatCheckbox,
        MatDivider,
        MatChipGrid,
        MatChipRow,
        MatChipInput,
        MatChipRemove,
        MatProgressSpinner
    ],
  providers: [
    provideAnimationsAsync(),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
