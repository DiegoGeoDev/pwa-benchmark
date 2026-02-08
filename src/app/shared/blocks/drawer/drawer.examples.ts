import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Z_SHEET_DATA } from '../../components/sheet';

import { DrawerTriggerComponent } from './drawer.component';

// ============================================
// Exemplo 1: Navegação Básica
// ============================================

@Component({
  selector: 'drawer-example-basic',
  imports: [DrawerTriggerComponent],
  template: `
    <z-drawer-trigger
      zTitle="Navegação"
      [zContent]="NavigationContent"
      [zHideFooter]="true"
    >
      Menu
    </z-drawer-trigger>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerExampleBasicComponent {
  NavigationContent = NavigationContentComponent;
}

@Component({
  template: `
    <nav class="flex flex-col gap-2 p-4">
      <a href="/home" class="px-4 py-2 rounded-lg hover:bg-accent">Home</a>
      <a href="/about" class="px-4 py-2 rounded-lg hover:bg-accent">About</a>
      <a href="/contact" class="px-4 py-2 rounded-lg hover:bg-accent">Contact</a>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NavigationContentComponent {}

// ============================================
// Exemplo 2: Com Dados
// ============================================

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

@Component({
  selector: 'drawer-example-with-data',
  imports: [DrawerTriggerComponent],
  template: `
    <z-drawer-trigger
      zTitle="Editar Perfil"
      zDescription="Atualize suas informações de perfil"
      [zContent]="ProfileFormContent"
      [zData]="userProfile"
      zOkText="Salvar Alterações"
      zCancelText="Cancelar"
    >
      Editar Perfil
    </z-drawer-trigger>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerExampleWithDataComponent {
  ProfileFormContent = ProfileFormComponent;

  userProfile: UserProfile = {
    name: 'João Silva',
    email: 'joao@example.com',
    bio: 'Desenvolvedor Full Stack',
  };
}

@Component({
  template: `
    <form class="flex flex-col gap-4 p-4">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Nome</label>
        <input
          type="text"
          [value]="profile.name"
          class="px-3 py-2 rounded-lg border border-border bg-background"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Email</label>
        <input
          type="email"
          [value]="profile.email"
          class="px-3 py-2 rounded-lg border border-border bg-background"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Bio</label>
        <textarea
          [value]="profile.bio"
          rows="4"
          class="px-3 py-2 rounded-lg border border-border bg-background"
        ></textarea>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProfileFormComponent {
  profile = inject<UserProfile>(Z_SHEET_DATA);
}

// ============================================
// Exemplo 3: Drawer Direito (Configurações)
// ============================================

@Component({
  selector: 'drawer-example-settings',
  imports: [DrawerTriggerComponent],
  template: `
    <z-drawer-trigger
      zTitle="Configurações"
      [zContent]="SettingsContent"
      zSide="right"
      zSize="lg"
      [zHideFooter]="true"
    >
      Configurações
    </z-drawer-trigger>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerExampleSettingsComponent {
  SettingsContent = SettingsContentComponent;
}

@Component({
  template: `
    <div class="flex flex-col gap-6 p-4">
      <section class="flex flex-col gap-3">
        <h3 class="text-lg font-semibold">Aparência</h3>
        <div class="flex items-center justify-between">
          <span>Modo Escuro</span>
          <input type="checkbox" />
        </div>
      </section>

      <section class="flex flex-col gap-3">
        <h3 class="text-lg font-semibold">Notificações</h3>
        <div class="flex items-center justify-between">
          <span>Email</span>
          <input type="checkbox" checked />
        </div>
        <div class="flex items-center justify-between">
          <span>Push</span>
          <input type="checkbox" />
        </div>
      </section>

      <section class="flex flex-col gap-3">
        <h3 class="text-lg font-semibold">Privacidade</h3>
        <div class="flex items-center justify-between">
          <span>Perfil Público</span>
          <input type="checkbox" checked />
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SettingsContentComponent {}
