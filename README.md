# `🌲 THE WILD OASIS`
* Bu proje **Advanced React Course** kapsamında oluşturduğum bir projedir. Proje kısaca bir bungalov tarzı konaklama firmasının müşterilerinin kiralama durumlarını kontrol edebileceği, aynı zamanda da sahip oldukları bungalov evlerine bir cabin ismi, kaç kişilik kapasitesi olduğunu, fiyat bilgisini ekleyebileceği bir uygulamadır.

## `TECH-STACK`
* Supabase
* Tanstack-Query
* Tanstack-Query Devtools
* Date-fns
* React-Hook-Form
* React-icons
* React-error-boundary
* React-Router
* Recharts
* Styled-Components
* Context-API
* LocalStorage

## `PROJEMDE BULUNAN ÖZELLİKLER`
* **Darkmode & Lightmode** => ContextApi, LocalStorage, custom hook yapısı ve styled-components kullanarak kullanıcının mevcut cihazındaki temayı bulup kullanan aynı zamanda da manuel olarak değiştirilebilen bir DarkMode özelliği.
  
* **Authentication & Authorization** => Login ve Logout durumları için **Supabase**'in sağladığı fonksiyonlar olan signInWithPassword ve signOut kullanarak kullanıcının uygulamaya erişimine izin verdim. Authenticated olmayan kullanıcılar için bir ProtectedRoute oluşturarak uygulama sayfamı login olmamış kullanıcıların erişimine engelledim.
  
* **Session** => Kullanıcının uzun bir aradan sonra uygulama tekrar gelmesi durumunda otomatik olarak Supabase üzerinden auth.getSession ve auth.getUser fonksiyonları aracılığıyla kullanıcıyı otomatik olarak uygulamaya yönlendirdim. Böylece kullanıcı logout olmadığı sürece uygulamaya ne kadar zaman sonra gelirse gelsin otomatik olarak loggedIn sayılacak.
  
* **Updating User** => Kullanıcının uygulama içerisinden şifresini, kullanıcı adını ve avatarını güncelleyebilmesine Supabase'in updateUser fonksiyonu aracılığı ile izin verdim. Kullanıcıya tüm alanları doldurmasını zorlamak yerine sadece istediği alanı güncelleyebilmesi adına fonksiyonumu ayarladım.

* **Bookings** => Supabase üzerinden tüm kiralamaları projeme aldım ve fonksiyonumda farklı durum varyasyonları için filter, sortBy, page paramterleri ile supabase sorgumu güncelledim. Böylece sadece gerektiğinde filtereleme ve sortlama durumunlarını sorgularıma eklediğim için gereksiz ve yanlış veri getirmek yerine performansı ve doğru veriyi getirmeyi ele almış oldum. Herhangi bir kiralama hakkında güncelleme veya silme yapabilmek için supabase'e bookingId ile sorgu yaptım ve düzenleme-silme için bir route oluşturdum.

* **Cabins** => Supabase üzerinden tüm cabinlerimi alıp tamamını tablomda listeledim. Yeni bir cabin oluşturmak için bir createCabin form'u oluşturdum ve kullanıcıya tüm cabin bilgileriyle beraber cabinin bir resmini de girebileceği alanlar tanımladım. Oluşturulmuş yeni cabinin tabloda eklemeden hemen sonra yer alabilmesi için react-query'den yardım aldım. Olası bir ihtimalde resmin database'e yüklenememesi halinde yeni oluşturulan cabinin silinip kullanıcıya gerekli hata mesajlarının gösterilmesini ele aldım.

* **Settings** => 

## To use this application :

* User mail : `kadir@example.com`
* Password : `admin`
