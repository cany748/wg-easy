"use strict";

const messages = {
  en: {
    name: "Name",
    password: "Password",
    signIn: "Sign In",
    logout: "Logout",
    updateAvailable: "There is an update available!",
    update: "Update",
    clients: "Clients",
    new: "New",
    deleteClient: "Delete Client",
    deleteDialog1: "Are you sure you want to delete",
    deleteDialog2: "This action cannot be undone.",
    cancel: "Cancel",
    create: "Create",
    createdOn: "Created on ",
    lastSeen: "Last seen on ",
    totalDownload: "Total Download: ",
    totalUpload: "Total Upload: ",
    newClient: "New Client",
    disableClient: "Disable Client",
    enableClient: "Enable Client",
    noClients: "There are no clients yet.",
    noPrivKey: "This client has no known private key. Cannot create Configuration.",
    showQR: "Show QR Code",
    downloadConfig: "Download Configuration",
    madeBy: "Made by",
    donate: "Donate",
    toggleCharts: "Show/hide Charts",
    theme: { dark: "Dark theme", light: "Light theme", auto: "Auto theme" },
  },
  ua: {
    name: "Ім`я",
    password: "Пароль",
    signIn: "Увійти",
    logout: "Вихід",
    updateAvailable: "Доступне оновлення!",
    update: "Оновити",
    clients: "Клієнти",
    new: "Новий",
    deleteClient: "Видалити клієнта",
    deleteDialog1: "Ви впевнені, що бажаєте видалити",
    deleteDialog2: "Цю дію неможливо скасувати.",
    cancel: "Скасувати",
    create: "Створити",
    createdOn: "Створено ",
    lastSeen: "Останнє підключення в ",
    totalDownload: "Всього завантажено: ",
    totalUpload: "Всього відправлено: ",
    newClient: "Новий клієнт",
    disableClient: "Вимкнути клієнта",
    enableClient: "Увімкнути клієнта",
    noClients: "Ще немає клієнтів.",
    showQR: "Показати QR-код",
    downloadConfig: "Завантажити конфігурацію",
    madeBy: "Зроблено",
    donate: "Пожертвувати",
  },
  ru: {
    name: "Имя",
    password: "Пароль",
    signIn: "Войти",
    logout: "Выйти",
    updateAvailable: "Доступно обновление!",
    update: "Обновить",
    clients: "Клиенты",
    new: "Создать",
    deleteClient: "Удалить клиента",
    deleteDialog1: "Вы уверены, что хотите удалить",
    deleteDialog2: "Это действие невозможно отменить.",
    cancel: "Закрыть",
    create: "Создать",
    createdOn: "Создано в ",
    lastSeen: "Последнее подключение в ",
    totalDownload: "Всего скачано: ",
    totalUpload: "Всего загружено: ",
    newClient: "Создать клиента",
    disableClient: "Выключить клиента",
    enableClient: "Включить клиента",
    noClients: "Пока нет клиентов.",
    showQR: "Показать QR-код",
    downloadConfig: "Скачать конфигурацию",
    madeBy: "Автор",
    donate: "Поблагодарить",
  },
  tr: {
    // Müslüm Barış Korkmazer @babico
    name: "İsim",
    password: "Şifre",
    signIn: "Giriş Yap",
    logout: "Çıkış Yap",
    updateAvailable: "Mevcut bir güncelleme var!",
    update: "Güncelle",
    clients: "Kullanıcılar",
    new: "Yeni",
    deleteClient: "Kullanıcı Sil",
    deleteDialog1: "Silmek istediğine emin misin",
    deleteDialog2: "Bu işlem geri alınamaz.",
    cancel: "İptal",
    create: "Oluştur",
    createdAt: "Şu saatte oluşturuldu: ",
    lastSeen: "Son görülme tarihi: ",
    totalDownload: "Toplam İndirme: ",
    totalUpload: "Toplam Yükleme: ",
    newClient: "Yeni Kullanıcı",
    disableClient: "İstemciyi Devre Dışı Bırak",
    enableClient: "İstemciyi Etkinleştir",
    noClients: "Henüz kullanıcı yok.",
    showQR: "QR Kodunu Göster",
    downloadConfig: "Yapılandırmayı İndir",
    madeBy: "Yapan Kişi: ",
    donate: "Bağış Yap",
    changeLang: "Dil Değiştir",
  },
  no: {
    // github.com/digvalley
    name: "Navn",
    password: "Passord",
    signIn: "Logg Inn",
    logout: "Logg Ut",
    updateAvailable: "En ny oppdatering er tilgjengelig!",
    update: "Oppdater",
    clients: "Klienter",
    new: "Ny",
    deleteClient: "Slett Klient",
    deleteDialog1: "Er du sikker på at du vil slette?",
    deleteDialog2: "Denne handlingen kan ikke angres",
    cancel: "Avbryt",
    create: "Opprett",
    createdOn: "Opprettet ",
    lastSeen: "Sist sett ",
    totalDownload: "Total Nedlasting: ",
    totalUpload: "Total Opplasting: ",
    newClient: "Ny Klient",
    disableClient: "Deaktiver Klient",
    enableClient: "Aktiver Klient",
    noClients: "Ingen klienter opprettet enda.",
    showQR: "Vis QR Kode",
    downloadConfig: "Last Ned Konfigurasjon",
    madeBy: "Laget av",
    donate: "Doner",
  },
  pl: {
    // github.com/archont94
    name: "Nazwa",
    password: "Hasło",
    signIn: "Zaloguj się",
    logout: "Wyloguj się",
    updateAvailable: "Dostępna aktualizacja!",
    update: "Aktualizuj",
    clients: "Klienci",
    new: "Stwórz klienta",
    deleteClient: "Usuń klienta",
    deleteDialog1: "Jesteś pewny że chcesz usunąć",
    deleteDialog2: "Tej akcji nie da się cofnąć.",
    cancel: "Anuluj",
    create: "Stwórz",
    createdOn: "Utworzono ",
    lastSeen: "Ostatnio widziany ",
    totalDownload: "Całkowite pobieranie: ",
    totalUpload: "Całkowite wysyłanie: ",
    newClient: "Nowy klient",
    disableClient: "Wyłączenie klienta",
    enableClient: "Włączenie klienta",
    noClients: "Nie ma jeszcze klientów.",
    showQR: "Pokaż kod QR",
    downloadConfig: "Pobierz konfigurację",
    madeBy: "Stworzone przez",
    donate: "Wsparcie autora",
  },
  fr: {
    // github.com/clem3109
    name: "Nom",
    password: "Mot de passe",
    signIn: "Se Connecter",
    logout: "Se déconnecter",
    updateAvailable: "Une mise à jour est disponible !",
    update: "Mise à jour",
    clients: "Clients",
    new: "Nouveau",
    deleteClient: "Supprimer ce client",
    deleteDialog1: "Êtes-vous que vous voulez supprimer",
    deleteDialog2: "Cette action ne peut pas être annulée.",
    cancel: "Annuler",
    create: "Créer",
    createdOn: "Créé le ",
    lastSeen: "Dernière connexion le ",
    totalDownload: "Téléchargement total : ",
    totalUpload: "Téléversement total : ",
    newClient: "Nouveau client",
    disableClient: "Désactiver ce client",
    enableClient: "Activer ce client",
    noClients: "Aucun client pour le moment.",
    showQR: "Afficher le code à réponse rapide (QR Code)",
    downloadConfig: "Télécharger la configuration",
    madeBy: "Développé par",
    donate: "Soutenir",
  },
  de: {
    // github.com/florian-asche
    name: "Name",
    password: "Passwort",
    signIn: "Anmelden",
    logout: "Abmelden",
    updateAvailable: "Eine Aktualisierung steht zur Verfügung!",
    update: "Aktualisieren",
    clients: "Clients",
    new: "Neu",
    deleteClient: "Client löschen",
    deleteDialog1: "Möchtest du wirklich löschen?",
    deleteDialog2: "Diese Aktion kann nicht rückgängig gemacht werden.",
    cancel: "Abbrechen",
    create: "Erstellen",
    createdOn: "Erstellt am ",
    lastSeen: "Zuletzt Online ",
    totalDownload: "Gesamt Download: ",
    totalUpload: "Gesamt Upload: ",
    newClient: "Neuer Client",
    disableClient: "Client deaktivieren",
    enableClient: "Client aktivieren",
    noClients: "Es wurden noch keine Clients konfiguriert.",
    noPrivKey: "Es ist kein Private Key für diesen Client bekannt. Eine Konfiguration kann nicht erstellt werden.",
    showQR: "Zeige den QR Code",
    downloadConfig: "Konfiguration herunterladen",
    madeBy: "Erstellt von",
    donate: "Spenden",
  },
  ca: {
    // github.com/guillembonet
    name: "Nom",
    password: "Contrasenya",
    signIn: "Iniciar sessió",
    logout: "Tanca sessió",
    updateAvailable: "Hi ha una actualització disponible!",
    update: "Actualitza",
    clients: "Clients",
    new: "Nou",
    deleteClient: "Esborra client",
    deleteDialog1: "Estàs segur que vols esborrar aquest client?",
    deleteDialog2: "Aquesta acció no es pot desfer.",
    cancel: "Cancel·la",
    create: "Crea",
    createdOn: "Creat el ",
    lastSeen: "Última connexió el ",
    totalDownload: "Baixada total: ",
    totalUpload: "Pujada total: ",
    newClient: "Nou client",
    disableClient: "Desactiva client",
    enableClient: "Activa client",
    noClients: "Encara no hi ha cap client.",
    showQR: "Mostra codi QR",
    downloadConfig: "Descarrega configuració",
    madeBy: "Fet per",
    donate: "Donatiu",
  },
  es: {
    // github.com/amarqz
    name: "Nombre",
    password: "Contraseña",
    signIn: "Iniciar sesión",
    logout: "Cerrar sesión",
    updateAvailable: "¡Hay una actualización disponible!",
    update: "Actualizar",
    clients: "Clientes",
    new: "Nuevo",
    deleteClient: "Eliminar cliente",
    deleteDialog1: "¿Estás seguro de que quieres borrar este cliente?",
    deleteDialog2: "Esta acción no podrá ser revertida.",
    cancel: "Cancelar",
    create: "Crear",
    createdOn: "Creado el ",
    lastSeen: "Última conexión el ",
    totalDownload: "Total descargado: ",
    totalUpload: "Total subido: ",
    newClient: "Nuevo cliente",
    disableClient: "Desactivar cliente",
    enableClient: "Activar cliente",
    noClients: "Aún no hay ningún cliente.",
    showQR: "Mostrar código QR",
    downloadConfig: "Descargar configuración",
    madeBy: "Hecho por",
    donate: "Donar",
    toggleCharts: "Mostrar/Ocultar gráficos",
    theme: { dark: "Modo oscuro", light: "Modo claro", auto: "Modo automático" },
  },
  ko: {
    name: "이름",
    password: "암호",
    signIn: "로그인",
    logout: "로그아웃",
    updateAvailable: "업데이트가 있습니다!",
    update: "업데이트",
    clients: "클라이언트",
    new: "추가",
    deleteClient: "클라이언트 삭제",
    deleteDialog1: "삭제 하시겠습니까?",
    deleteDialog2: "이 작업은 취소할 수 없습니다.",
    cancel: "취소",
    create: "생성",
    createdOn: "생성일: ",
    lastSeen: "마지막 사용 날짜: ",
    totalDownload: "총 다운로드: ",
    totalUpload: "총 업로드: ",
    newClient: "새로운 클라이언트",
    disableClient: "클라이언트 비활성화",
    enableClient: "클라이언트 활성화",
    noClients: "아직 클라이언트가 없습니다.",
    showQR: "QR 코드 표시",
    downloadConfig: "구성 다운로드",
    madeBy: "만든 사람",
    donate: "기부",
  },
  vi: {
    name: "Tên",
    password: "Mật khẩu",
    signIn: "Đăng nhập",
    logout: "Đăng xuất",
    updateAvailable: "Có bản cập nhật mới!",
    update: "Cập nhật",
    clients: "Danh sách người dùng",
    new: "Mới",
    deleteClient: "Xóa người dùng",
    deleteDialog1: "Bạn có chắc chắn muốn xóa",
    deleteDialog2: "Thao tác này không thể hoàn tác.",
    cancel: "Huỷ",
    create: "Tạo",
    createdOn: "Được tạo lúc ",
    lastSeen: "Lần xem cuối vào ",
    totalDownload: "Tổng dung lượng tải xuống: ",
    totalUpload: "Tổng dung lượng tải lên: ",
    newClient: "Người dùng mới",
    disableClient: "Vô hiệu hóa người dùng",
    enableClient: "Kích hoạt người dùng",
    noClients: "Hiện chưa có người dùng nào.",
    showQR: "Hiển thị mã QR",
    downloadConfig: "Tải xuống cấu hình",
    madeBy: "Được tạo bởi",
    donate: "Ủng hộ",
  },
  nl: {
    name: "Naam",
    password: "Wachtwoord",
    signIn: "Inloggen",
    logout: "Uitloggen",
    updateAvailable: "Nieuw update beschikbaar!",
    update: "update",
    clients: "clients",
    new: "Nieuw",
    deleteClient: "client verwijderen",
    deleteDialog1: "Weet je zeker dat je wilt verwijderen",
    deleteDialog2: "Deze actie kan niet ongedaan worden gemaakt.",
    cancel: "Annuleren",
    create: "Creëren",
    createdOn: "Gemaakt op ",
    lastSeen: "Laatst gezien op ",
    totalDownload: "Totaal Gedownload: ",
    totalUpload: "Totaal Geupload: ",
    newClient: "Nieuwe client",
    disableClient: "client uitschakelen",
    enableClient: "client inschakelen",
    noClients: "Er zijn nog geen clients.",
    showQR: "QR-code weergeven",
    downloadConfig: "Configuratie downloaden",
    madeBy: "Gemaakt door",
    donate: "Doneren",
  },
  is: {
    name: "Nafn",
    password: "Lykilorð",
    signIn: "Skrá inn",
    logout: "Útskráning",
    updateAvailable: "Það er uppfærsla í boði!",
    update: "Uppfæra",
    clients: "Viðskiptavinir",
    new: "Nýtt",
    deleteClient: "Eyða viðskiptavin",
    deleteDialog1: "Ertu viss um að þú viljir eyða",
    deleteDialog2: "Þessi aðgerð getur ekki verið afturkallað.",
    cancel: "Hætta við",
    create: "Búa til",
    createdOn: "Búið til á ",
    lastSeen: "Síðast séð á ",
    totalDownload: "Samtals Niðurhlaða: ",
    totalUpload: "Samtals Upphlaða: ",
    newClient: "Nýr Viðskiptavinur",
    disableClient: "Gera viðskiptavin óvirkan",
    enableClient: "Gera viðskiptavin virkan",
    noClients: "Engir viðskiptavinir ennþá.",
    showQR: "Sýna QR-kóða",
    downloadConfig: "Niðurhal Stillingar",
    madeBy: "Gert af",
    donate: "Gefa",
  },
  pt: {
    name: "Nome",
    password: "Palavra Chave",
    signIn: "Entrar",
    logout: "Sair",
    updateAvailable: "Existe uma atualização disponível!",
    update: "Atualizar",
    clients: "Clientes",
    new: "Novo",
    deleteClient: "Apagar Clientes",
    deleteDialog1: "Tem certeza que pretende apagar",
    deleteDialog2: "Esta ação não pode ser revertida.",
    cancel: "Cancelar",
    create: "Criar",
    createdOn: "Criado em ",
    lastSeen: "Último acesso em ",
    totalDownload: "Total Download: ",
    totalUpload: "Total Upload: ",
    newClient: "Novo Cliente",
    disableClient: "Desativar Cliente",
    enableClient: "Ativar Cliente",
    noClients: "Não existem ainda clientes.",
    showQR: "Apresentar o código QR",
    downloadConfig: "Descarregar Configuração",
    madeBy: "Feito por",
    donate: "Doar",
  },
  chs: {
    name: "名称",
    password: "密码",
    signIn: "登录",
    logout: "退出",
    updateAvailable: "有新版本可用！",
    update: "更新",
    clients: "客户端",
    new: "新建",
    deleteClient: "删除客户端",
    deleteDialog1: "您确定要删除",
    deleteDialog2: "此操作无法撤销。",
    cancel: "取消",
    create: "创建",
    createdOn: "创建于 ",
    lastSeen: "最后访问于 ",
    totalDownload: "总下载: ",
    totalUpload: "总上传: ",
    newClient: "新建客户端",
    disableClient: "禁用客户端",
    enableClient: "启用客户端",
    noClients: "目前没有客户端。",
    showQR: "显示二维码",
    downloadConfig: "下载配置",
    madeBy: "由",
    donate: "捐赠",
  },
  cht: {
    name: "名字",
    password: "密碼",
    signIn: "登入",
    logout: "登出",
    updateAvailable: "有新版本可用！",
    update: "更新",
    clients: "客戶",
    new: "新建",
    deleteClient: "刪除客戶",
    deleteDialog1: "您確定要刪除",
    deleteDialog2: "此操作無法撤銷。",
    cancel: "取消",
    create: "建立",
    createdOn: "建立於 ",
    lastSeen: "最後訪問於 ",
    totalDownload: "總下載: ",
    totalUpload: "總上傳: ",
    newClient: "新客戶",
    disableClient: "禁用客戶",
    enableClient: "啟用客戶",
    noClients: "目前沒有客戶。",
    showQR: "顯示二維碼",
    downloadConfig: "下載配置",
    madeBy: "由",
    donate: "捐贈",
  },
  it: {
    name: "Nome",
    password: "Password",
    signIn: "Accedi",
    logout: "Esci",
    updateAvailable: "È disponibile un aggiornamento!",
    update: "Aggiorna",
    clients: "Client",
    new: "Nuovo",
    deleteClient: "Elimina Client",
    deleteDialog1: "Sei sicuro di voler eliminare",
    deleteDialog2: "Questa azione non può essere annullata.",
    cancel: "Annulla",
    create: "Crea",
    createdOn: "Creato il ",
    lastSeen: "Visto l'ultima volta il ",
    totalDownload: "Totale Download: ",
    totalUpload: "Totale Upload: ",
    newClient: "Nuovo Client",
    disableClient: "Disabilita Client",
    enableClient: "Abilita Client",
    noClients: "Non ci sono ancora client.",
    showQR: "Mostra codice QR",
    downloadConfig: "Scarica configurazione",
    madeBy: "Realizzato da",
    donate: "Donazione",
  },
  th: {
    name: "ชื่อ",
    password: "รหัสผ่าน",
    signIn: "ลงชื่อเข้าใช้",
    logout: "ออกจากระบบ",
    updateAvailable: "มีอัปเดตพร้อมใช้งาน!",
    update: "อัปเดต",
    clients: "Clients",
    new: "ใหม่",
    deleteClient: "ลบ Client",
    deleteDialog1: "คุณแน่ใจหรือไม่ว่าต้องการลบ",
    deleteDialog2: "การกระทำนี้;ไม่สามารถยกเลิกได้",
    cancel: "ยกเลิก",
    create: "สร้าง",
    createdOn: "สร้างเมื่อ ",
    lastSeen: "เห็นครั้งสุดท้ายเมื่อ ",
    totalDownload: "ดาวน์โหลดทั้งหมด: ",
    totalUpload: "อัพโหลดทั้งหมด: ",
    newClient: "Client ใหม่",
    disableClient: "ปิดการใช้งาน Client",
    enableClient: "เปิดการใช้งาน Client",
    noClients: "ยังไม่มี Clients เลย",
    showQR: "แสดงรหัส QR",
    downloadConfig: "ดาวน์โหลดการตั้งค่า",
    madeBy: "สร้างโดย",
    donate: "บริจาค",
  },
  hi: {
    // github.com/rahilarious
    name: "नाम",
    password: "पासवर्ड",
    signIn: "लॉगिन",
    logout: "लॉगआउट",
    updateAvailable: "अपडेट उपलब्ध है!",
    update: "अपडेट",
    clients: "उपयोगकर्ताये",
    new: "नया",
    deleteClient: "उपयोगकर्ता हटाएँ",
    deleteDialog1: "क्या आपको पक्का हटाना है",
    deleteDialog2: "यह निर्णय पलट नहीं सकता।",
    cancel: "कुछ ना करें",
    create: "बनाएं",
    createdOn: "सर्जन तारीख ",
    lastSeen: "पिछली बार देखे गए थे ",
    totalDownload: "कुल डाउनलोड: ",
    totalUpload: "कुल अपलोड: ",
    newClient: "नया उपयोगकर्ता",
    disableClient: "उपयोगकर्ता स्थगित कीजिये",
    enableClient: "उपयोगकर्ता शुरू कीजिये",
    noClients: "अभी तक कोई भी उपयोगकर्ता नहीं है।",
    noPrivKey: "ये उपयोगकर्ता की कोई भी गुप्त चाबी नहीं हे। बना नहीं सकते।",
    showQR: "क्यू आर कोड देखिये",
    downloadConfig: "डाउनलोड कॉन्फीग्यूरेशन",
    madeBy: "सर्जक",
    donate: "दान करें",
  },
};
