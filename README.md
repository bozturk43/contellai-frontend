# ContellAI Frontend

Bu repo, **ContellAI** projesinin kullanıcı arayüzünü (frontend) içerir. Proje, [ContellAI Backend](https://github.com/bozturk43/contellai-backend) API'si ile iletişim kuran modern bir web uygulamasıdır.

## 🚀 Projenin Amacı

ContellAI backend servislerinin sağladığı yapay zeka destekli içerik üretme, çalışma alanı yönetimi ve kullanıcı kimlik doğrulama gibi özellikleri son kullanıcıya sunan, interaktif ve kullanıcı dostu bir arayüz sağlamak.

## 🛠️ Kullanılan Teknolojiler ve Mimariler

- **Framework:** Next.js 14+ (App Router ile)
- **Dil:** TypeScript
- **UI Kütüphanesi:** Material-UI (MUI) v5
- **CSS Framework'ü:** Tailwind CSS
- **Form Yönetimi:** React Hook Form
- **Şema & Doğrulama (Validation):** Zod
- **Sunucu Durumu Yönetimi (Data Fetching):** TanStack Query (React Query) v5
- **Kimlik Doğrulama (Authentication):** JWT (güvenli, `httpOnly` cookie'ler aracılığıyla)

## 🏁 Projeyi Yerel Makinede Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- [Node.js](https://nodejs.org/en) (LTS versiyonu tavsiye edilir)
- npm veya yarn

### Kurulum Adımları

1.  **Repoyu Klonlama:**
    ```bash
    git clone [https://github.com/SENIN-KULLANICI-ADIN/contellai-frontend.git](https://github.com/SENIN-KULLANICI-ADIN/contellai-frontend.git)
    cd contellai-frontend
    ```

2.  **Bağımlılıkları Yükleme:**
    ```bash
    npm install
    ```

3.  **Ortam Değişkenlerini (Environment Variables) Yapılandırma:**
    Projenin ana dizininde `.env.local` adında bir dosya oluşturun. Bu dosya, projenin hangi backend API'si ile konuşacağını belirtir. İçeriği aşağıdaki gibi olmalıdır:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:5089
    ```
    *Not: Backend API'nizin çalıştığı `http` port numarasını doğru girdiğinizden emin olun.*

4.  **Uygulamayı Geliştirme Modunda Çalıştırma:**
    Backend API'nizin çalıştığından emin olduktan sonra, aşağıdaki komutu çalıştırın:
    ```bash
    npm run dev
    ```
    Uygulama, tarayıcınızda `http://localhost:3000` adresinde açılacaktır.

---
