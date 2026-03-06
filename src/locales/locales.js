import {
    PATH_LIST
} from "../utils/pathList"

const localeData = {
    CART_LOCALES: {
        en: {
            PRODUCTS: 'Products',
            ADDONS: 'Addons',
            DISCOUNTS: {
                ONE: 'Discount',
                MORE: 'Discounts'
            },
            TOTAL: 'Total',
            DISCOUNTS_USED: 'Used'
        },
        bg: {
            PRODUCTS: 'Продукти',
            ADDONS: 'Добавки',
            DISCOUNTS: {
                ONE: 'отстъпка',
                MORE: 'отстъпки'
            },
            TOTAL: 'Общо',
            DISCOUNTS_USED: 'Използвани'
        },
        de: {
            PRODUCTS: 'Produkte',
            ADDONS: 'Addons',
            DISCOUNTS: {
                ONE: 'Rabatt',
                MORE: 'Rabatte'
            },
            TOTAL: 'Gesamt',
            DISCOUNTS_USED: 'Verwendet'
        },
        fr: {
            PRODUCTS: 'Produits',
            ADDONS: 'Extensions',
            DISCOUNTS: {
                ONE: 'remise',
                MORE: 'remises'
            },
            TOTAL: 'Total',
            DISCOUNTS_USED: 'Utilisés'
        },
        ru: {
            PRODUCTS: 'Продукты',
            ADDONS: 'Дополнения',
            DISCOUNTS: {
                ONE: 'скидка',
                MORE: 'скидки'
            },
            TOTAL: 'Итого',
            DISCOUNTS_USED: 'Использовано'
        },
        tr: {
            PRODUCTS: 'Ürünler',
            ADDONS: 'Eklentiler',
            DISCOUNTS: {
                ONE: 'İndirim',
                MORE: 'İndirimler'
            },
            TOTAL: 'Toplam',
            DISCOUNTS_USED: 'Kullanıldı'
        },
        ro: {
            PRODUCTS: 'Produse',
            ADDONS: 'Suplimente',
            DISCOUNTS: {
                ONE: 'reducere',
                MORE: 'reduceri'
            },
            TOTAL: 'Total',
            DISCOUNTS_USED: 'Folosit'
        }
    },
    APP_LOCALES: {
        bg: {
            Title: 'Дигитално меню на {object}',
            Header: {
                VMENU_PROMO_TEXT: 'Поддържано и разработвано от V-MENU',
                Information: {
                    Text: 'Информация за',
                    Modules: {
                        Wifi: {
                            Header: 'WIFI Информация',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Парола',
                            }
                        },
                        Contact_Information: {
                            Header: 'Контактна Информация',
                            Subtext: 'Свържете се с управителя:',
                        },
                        Social_Media: {
                            Header: 'Социални Връзки',
                            Subtext: 'Свържете се с нас в социалните мрежи:',
                        },
                        Additional_Information: {
                            Text: ' Допълнителна Информация:',
                        }
                    },
                    Close_Button: 'Затвори',
                }
            },
            Guest: 'Гост',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Добро Утро,',
                GOOD_DAY: 'Добър Ден,',
                GOOD_EVENING: 'Добър Вечер,',
                Products: {
                    Singular: 'Продукт',
                    Plural: 'Продукти',
                    DefiniteSingular: 'Продукта',
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Повикване на сервитьор',
                    options: {
                        changeAshTray: 'Смяна на пепелник',
                        requestBill: 'Поискване на сметка',
                        changeCutlery: 'Смяна на прибори',
                        refillWater: 'Попълване на вода',
                        cleanTable: 'Почистване на маса',
                        refillNapkins: 'Попълване на салфетки',
                        additionalChair: 'Допълнителен стол',
                        cleanSpill: 'Почистване на разлято',
                        additionalCondiments: 'Допълнителни подправки',
                        requestWaiterHelp: 'Помощ от сервитьор',
                        callManager: 'Повикване на управител',
                        reportOrderIssue: 'Сигнал за проблем с поръчка',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Избери език'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Алергени',
                        Options: {
                            NO_AVAILABLE: 'Няма добавени алергени в този продукт',
                        }
                    },
                    ADDONS: {
                        Text: 'Добавки',
                        States: {
                            Show: 'Покажи добавки',
                            Hide: 'Скрий добавки',
                            Add: 'Добави',
                        },
                        Options: {
                            NO_AVAILABLE: 'Няма налични добавки за този продукт',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'Добави в количката',
                    Remove_From_Cart: 'Премахни от количката',
                }
            },
            Categories: {
                Text: 'Категории',
                View_All: 'Разгледай всички предложения',
            },
            Badges: {
                Popular: 'Популярно',
                Promoted: 'Промотирано',
                New: 'Ново',
            },
            Products: {
                Product_Views: 'Преглеждания',
                Limited_Discount: 'В момента на лимитирана -{discount}% отстъпка!',
                Last_Products: 'Последни продукти'
            },
            Addons: 'Добавки',
            Total_Addons_Price: 'Обща цена: {totalPrice} {currency}',
            Product_Details: 'Детайли за продукт',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 Други ястия от "{category}", които нашите гости харесват...'
                }
            },
            News: {
                Header: {
                    Text: 'Новини'
                },
                Search: {
                    Placeholder: 'Търсене в новини',
                },
                Article: {
                    Upload_By: 'Качено от',
                    Last_Edit: 'Последно редактирана на',
                },
                No_News: 'Няма налични новини в момента'
            },
            Profile: {
                Header: 'Профил',
                Container: {
                    Text: 'Гост на',
                    Current_Table: 'В момента се намирате на маса №',
                    My_Cart: 'Моята количка',
                    Change_Table: 'Смяна на маса',
                }
            },
            Cart: {
                Cart_Text: 'Количка',
                Empty: {
                    Text: 'Количката ви е празна!',
                    Subtext: 'Няма продукти в количката ви все още, но не се притеснявате, имаме много вкусни предложения!',
                    Buttons: {
                        Home_Page: {
                            Text: 'Начална страница',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Разгледай меню',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Назад',
                    Text: 'Финализиране на поръчка',
                },
                Steps: {
                    Personal_Data: 'Лични данни',
                    Payment: 'Плащане',
                    Confirmation: 'Потвърждение',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Име',
                            Placeholder: 'Вашето име',
                        },
                        Guest_Email: {
                            Label: 'Имейл',
                            Placeholder: 'Вашият имейл',
                        },
                        Guest_Phone: {
                            Label: 'Телефон',
                            Placeholder: 'Вашият телефон',
                        },
                        Additional_Notes: {
                            Label: 'Допълнителни бележки (незадължително)',
                            Placeholder: 'Има ли нещо допълнително, което трябва да знаем за поръчката ви?',
                        },
                        Proceed_To_Payment: 'Продължи към плащане',
                    },
                    Payment: {
                        Card_Header: 'Начин на плащане',
                        Selector: {
                            Header: 'Изберете начин на плащане',
                            options: {
                                CASH: 'В Брой',
                                CARD: 'С Карта',
                            }
                        },
                        View_Order: 'Преглед на поръчката',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Потвърждение на поръчката',
                            Subtext: 'Вашата поръчка е готова за изпращане',
                        },
                        Confirm_Order_Text: 'Потвърди поръчката',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Успешно заявена поръчка!',
                            Subtext: 'Вашата поръчка беше успешно създадена. Моля, изчакайте, докато нашият екип я обработи и подготви за вас.'
                        },
                        Back_Button: 'Връщане обратно',
                    }
                },
                Success_Element: {
                    steps: [{
                            title: "Добавяне в количка",
                            icon: "🛒"
                        },
                        {
                            title: "Поръчката е създадена",
                            icon: "📋"
                        },
                        {
                            title: "Обработка на поръчката",
                            icon: "⚙️"
                        },
                        {
                            title: "Поръчката е доставена",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Очаквано време:',
                Minutes: 'минути',
                Have_Questions: 'Имате въпроси? Обадете ни се на: ',
            },
            Validations: {
                Required_Field: 'Това поле е задължително!',
                Invalid_Format: 'Невалиден формат!',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Нулиране на превода',
                    }
                }
            },
            Discount_Box: {
                Text: 'Имате промо код?',
                Placeholder: 'Въведете промо код',
                Apply_Button: 'Приложи',
                Applied_Discount: 'Приложена отстъпка:',
                Promo_Code: 'Промо код: ',
                Applied_Discount: 'Приложена отстъпка:',
                Response_List: {
                    Invalid_Code: '❌ Невалиден или изтекъл код',
                    No_Discount_Applied: '⚠️ Отстъпката не може да бъде приложена към избраните продукти',
                    Apply_Error: '❌ Грешка при прилагане на отстъпката',
                    General_Error: '⚠️ Възникна грешка, опитайте отново',
                    Success: '✅ Отстъпката е приложена успешно!',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Код, артикули и обект са задължителни',
                        INVALID_DISCOUNT_CODE: 'Невалиден код за отстъпка',
                        APPLY_DISCOUNT_ERROR: 'Отстъпката не можа да се приложи',
                        SERVER_ERROR: 'Вътрешна грешка на сървъра',
                        DISCOUNT_EXPIRED: 'Кодът е изтекъл',
                        DISCOUNT_NOT_APPLICABLE: 'Кодът не е приложим за избраните продукти',
                        DISCOUNT_ALREADY_USED: 'Кодът вече е използван',
                        MIN_PURCHASE_REQUIRED: 'Минималната сума за използване на този код не е достигната'
                    }
                }
            }


        },
        en: {
            Title: 'Digital Menu for {object}',
            Header: {
                VMENU_PROMO_TEXT: 'Powered and developed by V-MENU',
                Information: {
                    Text: 'Information',
                    Modules: {
                        Wifi: {
                            Header: 'WIFI Information',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Password',
                            }
                        },
                        Contact_Information: {
                            Header: 'Contact Information',
                            Subtext: 'Contact the manager:',
                        },
                        Social_Media: {
                            Header: 'Social Media',
                            Subtext: 'Connect with us on social media:',
                        },
                        Additional_Information: {
                            Text: 'Additional Information:',
                        }
                    },
                    Close_Button: 'Close',
                }
            },
            Guest: 'Guest',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Good Morning,',
                GOOD_DAY: 'Good Day,',
                GOOD_EVENING: 'Good Evening,',
                Products: {
                    Singular: 'Product',
                    Plural: 'Products'
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Call Waiter',
                    options: {
                        changeAshTray: 'Change ashtray',
                        requestBill: 'Request bill',
                        changeCutlery: 'Change cutlery',
                        refillWater: 'Refill water',
                        cleanTable: 'Clean table',
                        refillNapkins: 'Refill napkins',
                        additionalChair: 'Additional chair',
                        cleanSpill: 'Clean spill',
                        additionalCondiments: 'Additional condiments',
                        requestWaiterHelp: 'Waiter assistance',
                        callManager: 'Call manager',
                        reportOrderIssue: 'Report order issue',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Select Language'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Allergens',
                        Options: {
                            NO_AVAILABLE: 'No allergens added to this product',
                        }
                    },
                    ADDONS: {
                        Text: 'Addons',
                        States: {
                            Show: 'Show addons',
                            Hide: 'Hide addons',
                            Add: 'Add',
                        },
                        Options: {
                            NO_AVAILABLE: 'No addons available for this product',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'Add to Cart',
                    Remove_From_Cart: 'Remove from Cart',
                }
            },
            Categories: {
                Text: 'Categories',
                View_All: 'View all offers',
            },
            Badges: {
                Popular: 'Popular',
                Promoted: 'Promoted',
                New: 'New',
            },
            Products: {
                Product_Views: 'Views',
                Limited_Discount: 'Currently on limited -{discount}% discount!',
                Last_Products: 'Last products'
            },
            Addons: 'Addons',
            Total_Addons_Price: 'Total price: {totalPrice} {currency}',
            Product_Details: 'Product Details',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 Other dishes from "{category}" that our guests like...'
                }
            },
            News: {
                Header: {
                    Text: 'News'
                },
                Search: {
                    Placeholder: 'Search news',
                },
                Article: {
                    Upload_By: 'Uploaded by',
                    Last_Edit: 'Last edited on',
                },
                No_News: 'No news available at the moment'
            },
            Profile: {
                Header: 'Profile',
                Container: {
                    Text: 'Guest at',
                    Current_Table: 'You are currently at table No.',
                    My_Cart: 'My Cart',
                    Change_Table: 'Change Table',
                }
            },
            Cart: {
                Cart_Text: 'Cart',
                Empty: {
                    Text: 'Your cart is empty!',
                    Subtext: 'There are no products in your cart yet, but don\'t worry, we have many delicious offers!',
                    Buttons: {
                        Home_Page: {
                            Text: 'Home Page',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Browse Menu',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Back',
                    Text: 'Checkout',
                },
                Steps: {
                    Personal_Data: 'Personal Data',
                    Payment: 'Payment',
                    Confirmation: 'Confirmation',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Name',
                            Placeholder: 'Your name',
                        },
                        Guest_Email: {
                            Label: 'Email',
                            Placeholder: 'Your email',
                        },
                        Guest_Phone: {
                            Label: 'Phone',
                            Placeholder: 'Your phone',
                        },
                        Additional_Notes: {
                            Label: 'Additional notes (optional)',
                            Placeholder: 'Is there anything else we should know about your order?',
                        },
                        Proceed_To_Payment: 'Proceed to Payment',
                    },
                    Payment: {
                        Card_Header: 'Payment Method',
                        Selector: {
                            Header: 'Select payment method',
                            options: {
                                CASH: 'Cash',
                                CARD: 'Card',
                            }
                        },
                        View_Order: 'Review Order',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Order Confirmation',
                            Subtext: 'Your order is ready to be submitted',
                        },
                        Confirm_Order_Text: 'Confirm Order',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Order successfully placed!',
                            Subtext: 'Your order has been successfully created. Please wait while our team processes and prepares it for you.'
                        },
                        Back_Button: 'Go Back',
                    },


                },
                Success_Element: {
                    steps: [{
                            title: "Added to cart",
                            icon: "🛒"
                        },
                        {
                            title: "Order created",
                            icon: "📋"
                        },
                        {
                            title: "Order processing",
                            icon: "⚙️"
                        },
                        {
                            title: "Order delivered",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Expected time:',
                Minutes: 'minutes',
                Have_Questions: 'Have questions? Call us at: ',
            },
            Validations: {
                Required_Field: 'This field is required!',
                Invalid_Format: 'Invalid format!',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Reset translation',
                    }
                }
            },
            Discount_Box: {
                Text: 'Do you have a promo code?',
                Placeholder: 'Enter promo code',
                Apply_Button: 'Apply',
                Promo_Code: 'Promo code:',
                Applied_Discount: 'Applied discount:',
                Response_List: {
                    Invalid_Code: '❌ Invalid or expired code',
                    No_Discount_Applied: '⚠️ The discount cannot be applied to the selected products',
                    Apply_Error: '❌ Error applying the discount',
                    General_Error: '⚠️ An error occurred, please try again',
                    Success: '✅ The discount was successfully applied!',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Code, items, and object are required',
                        INVALID_DISCOUNT_CODE: 'Invalid discount code',
                        APPLY_DISCOUNT_ERROR: 'The discount could not be applied',
                        SERVER_ERROR: 'Internal server error',
                        DISCOUNT_EXPIRED: 'The code has expired',
                        DISCOUNT_NOT_APPLICABLE: 'The code is not applicable for the selected products',
                        DISCOUNT_ALREADY_USED: 'The code has already been used',
                        MIN_PURCHASE_REQUIRED: 'The minimum purchase amount for this code has not been reached'
                    }
                }
            }

        },
        tr: {
            Title: '{object} Dijital Menü',
            Header: {
                VMENU_PROMO_TEXT: 'V-MENU tarafından desteklenmektedir',
                Information: {
                    Text: 'Bilgi',
                    Modules: {
                        Wifi: {
                            Header: 'WIFI Bilgisi',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Şifre',
                            }
                        },
                        Contact_Information: {
                            Header: 'İletişim Bilgileri',
                            Subtext: 'Yöneticiyle iletişime geçin:',
                        },
                        Social_Media: {
                            Header: 'Sosyal Medya',
                            Subtext: 'Sosyal medyada bize ulaşın:',
                        },
                        Additional_Information: {
                            Text: 'Ek Bilgiler:',
                        }
                    },
                    Close_Button: 'Kapat',
                }
            },
            Guest: 'Misafir',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Günaydın,',
                GOOD_DAY: 'İyi Günler,',
                GOOD_EVENING: 'İyi Akşamlar,',
                Products: {
                    Singular: 'Ürün',
                    Plural: 'Ürünler'
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Garson Çağır',
                    options: {
                        changeAshTray: 'Küllük değiştirme',
                        requestBill: 'Hesap isteme',
                        changeCutlery: 'Bıçak takımı değiştirme',
                        refillWater: 'Su doldurma',
                        cleanTable: 'Masa temizleme',
                        refillNapkins: 'Peçete doldurma',
                        additionalChair: 'Ek sandalye',
                        cleanSpill: 'Döküleni temizleme',
                        additionalCondiments: 'Ek baharatlar',
                        requestWaiterHelp: 'Garson yardımı',
                        callManager: 'Müdür çağırma',
                        reportOrderIssue: 'Sipariş sorunu bildirme',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Dil Seçin'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Alerjenler',
                        Options: {
                            NO_AVAILABLE: 'Bu üründe alerjen bulunmamaktadır',
                        }
                    },
                    ADDONS: {
                        Text: 'Ekstralar',
                        States: {
                            Show: 'Ekstraları göster',
                            Hide: 'Ekstraları gizle',
                            Add: 'Ekle',
                        },
                        Options: {
                            NO_AVAILABLE: 'Bu ürün için mevcut ekstra yok',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'Sepete Ekle',
                    Remove_From_Cart: 'Sepetten Çıkar',
                }
            },
            Categories: {
                Text: 'Kategoriler',
                View_All: 'Tüm teklifleri görüntüle',
            },
            Badges: {
                Popular: 'Popüler',
                Promoted: 'Öne Çıkan',
                New: 'Yeni',
            },
            Products: {
                Product_Views: 'Görüntülenme',
                Limited_Discount: 'Şu anda sınırlı -{discount}% indirim!',
                Last_Products: 'Son Urunler',
            },
            Addons: 'Ekstralar',
            Total_Addons_Price: 'Toplam fiyat: {totalPrice} {currency}',
            Product_Details: 'Ürün Detayları',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 "{category}" kategorisinden misafirlerimizin sevdiği diğer yemekler...'
                }
            },
            News: {
                Header: {
                    Text: 'Haberler'
                },
                Search: {
                    Placeholder: 'Haberlerde ara',
                },
                Article: {
                    Upload_By: 'Yükleyen',
                    Last_Edit: 'Son düzenleme',
                },
                No_News: 'Şu anda haber bulunmamaktadır'
            },
            Profile: {
                Header: 'Profil',
                Container: {
                    Text: 'Misafir olarak',
                    Current_Table: 'Şu anda {table} numaralı masadasınız',
                    My_Cart: 'Sepetim',
                    Change_Table: 'Masa Değiştir',
                }
            },
            Cart: {
                Cart_Text: 'Sepet',
                Empty: {
                    Text: 'Sepetiniz boş!',
                    Subtext: 'Sepetinizde henüz ürün yok ama endişelenmeyin, birçok lezzetli seçeneğimiz var!',
                    Buttons: {
                        Home_Page: {
                            Text: 'Ana Sayfa',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Menüyü Görüntüle',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Geri',
                    Text: 'Siparişi Tamamla',
                },
                Steps: {
                    Personal_Data: 'Kişisel Bilgiler',
                    Payment: 'Ödeme',
                    Confirmation: 'Onay',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Ad',
                            Placeholder: 'Adınız',
                        },
                        Guest_Email: {
                            Label: 'E-posta',
                            Placeholder: 'E-postanız',
                        },
                        Guest_Phone: {
                            Label: 'Telefon',
                            Placeholder: 'Telefonunuz',
                        },
                        Additional_Notes: {
                            Label: 'Ek notlar (isteğe bağlı)',
                            Placeholder: 'Siparişiniz hakkında bilmemiz gereken başka bir şey var mı?',
                        },
                        Proceed_To_Payment: 'Ödemeye Geç',
                    },
                    Payment: {
                        Card_Header: 'Ödeme Yöntemi',
                        Selector: {
                            Header: 'Ödeme yöntemi seçin',
                            options: {
                                CASH: 'Nakit',
                                CARD: 'Kart',
                            }
                        },
                        View_Order: 'Siparişi Gözden Geçir',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Sipariş Onayı',
                            Subtext: 'Siparişiniz gönderilmeye hazır',
                        },
                        Confirm_Order_Text: 'Siparişi Onayla',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Sipariş başarıyla oluşturuldu!',
                            Subtext: 'Siparişiniz başarıyla oluşturuldu. Lütfen ekibimizin siparişinizi işlemesi ve hazırlaması için bekleyin.'
                        },
                        Back_Button: 'Geri Dön',
                    }
                },
                Success_Element: {
                    steps: [{
                            title: "Sepete eklendi",
                            icon: "🛒"
                        },
                        {
                            title: "Sipariş oluşturuldu",
                            icon: "📋"
                        },
                        {
                            title: "Sipariş işleniyor",
                            icon: "⚙️"
                        },
                        {
                            title: "Sipariş teslim edildi",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Tahmini süre:',
                Minutes: 'dakika',
                Have_Questions: 'Sorularınız mı var? Bizi arayın: ',

            },
            Validations: {
                Required_Field: 'Bu alan zorunludur!',
                Invalid_Format: 'Geçersiz format!',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Çeviriyi sıfırla',
                    }
                }
            },
            Discount_Box: {
                Text: 'Promosyon kodunuz var mı?',
                Placeholder: 'Promosyon kodunu girin',
                Apply_Button: 'Uygula',
                Promo_Code: 'Promosyon kodu:',
                Applied_Discount: 'Uygulanan indirim:',
                Response_List: {
                    Invalid_Code: '❌ Geçersiz veya süresi dolmuş kod',
                    No_Discount_Applied: '⚠️ İndirim seçili ürünlere uygulanamaz',
                    Apply_Error: '❌ İndirim uygulanırken hata oluştu',
                    General_Error: '⚠️ Bir hata oluştu, lütfen tekrar deneyin',
                    Success: '✅ İndirim başarıyla uygulandı!',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Kod, ürünler ve nesne zorunludur',
                        INVALID_DISCOUNT_CODE: 'Geçersiz indirim kodu',
                        APPLY_DISCOUNT_ERROR: 'İndirim uygulanamadı',
                        SERVER_ERROR: 'Sunucu hatası',
                        DISCOUNT_EXPIRED: 'Kodun süresi doldu',
                        DISCOUNT_NOT_APPLICABLE: 'Kod seçili ürünler için geçerli değil',
                        DISCOUNT_ALREADY_USED: 'Kod zaten kullanıldı',
                        MIN_PURCHASE_REQUIRED: 'Bu kod için gereken minimum alışveriş tutarına ulaşılmadı'
                    }
                }
            }

        },
        de: {
            Title: 'Digitale Speisekarte von {object}',
            Header: {
                VMENU_PROMO_TEXT: 'Unterstützt und entwickelt von V-MENU',
                Information: {
                    Text: 'Informationen',
                    Modules: {
                        Wifi: {
                            Header: 'WLAN-Informationen',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Passwort',
                            }
                        },
                        Contact_Information: {
                            Header: 'Kontaktinformationen',
                            Subtext: 'Kontaktieren Sie den Manager:',
                        },
                        Social_Media: {
                            Header: 'Soziale Medien',
                            Subtext: 'Folgen Sie uns auf Social Media:',
                        },
                        Additional_Information: {
                            Text: 'Zusätzliche Informationen:',
                        }
                    },
                    Close_Button: 'Schließen',
                }
            },
            Guest: 'Gast',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Guten Morgen,',
                GOOD_DAY: 'Guten Tag,',
                GOOD_EVENING: 'Guten Abend,',
                Products: {
                    Singular: 'Produkt',
                    Plural: 'Produkte'
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Kellner rufen',
                    options: {
                        changeAshTray: 'Aschenbecher wechseln',
                        requestBill: 'Rechnung verlangen',
                        changeCutlery: 'Besteck wechseln',
                        refillWater: 'Wasser nachfüllen',
                        cleanTable: 'Tisch reinigen',
                        refillNapkins: 'Servietten nachfüllen',
                        additionalChair: 'Zusätzlicher Stuhl',
                        cleanSpill: 'Verschüttetes reinigen',
                        additionalCondiments: 'Zusätzliche Gewürze',
                        requestWaiterHelp: 'Kellnerhilfe',
                        callManager: 'Manager rufen',
                        reportOrderIssue: 'Problem mit Bestellung melden',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Sprache wählen'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Allergene',
                        Options: {
                            NO_AVAILABLE: 'Keine Allergene in diesem Produkt',
                        }
                    },
                    ADDONS: {
                        Text: 'Extras',
                        States: {
                            Show: 'Extras anzeigen',
                            Hide: 'Extras ausblenden',
                            Add: 'Hinzufügen',
                        },
                        Options: {
                            NO_AVAILABLE: 'Keine Extras für dieses Produkt verfügbar',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'In den Warenkorb',
                    Remove_From_Cart: 'Aus Warenkorb entfernen',
                }
            },
            Categories: {
                Text: 'Kategorien',
                View_All: 'Alle Angebote ansehen',
            },
            Badges: {
                Popular: 'Beliebt',
                Promoted: 'Empfohlen',
                New: 'Neu',
            },
            Products: {
                Product_Views: 'Aufrufe',
                Limited_Discount: 'Aktuell limitierter -{discount}% Rabatt!',
                Last_Products: 'Letzte Produkte'

            },
            Addons: 'Extras',
            Total_Addons_Price: 'Gesamtpreis: {totalPrice} {currency}',
            Product_Details: 'Produktdetails',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 Weitere Gerichte aus "{category}", die unsere Gäste mögen...'
                }
            },
            News: {
                Header: {
                    Text: 'Neuigkeiten'
                },
                Search: {
                    Placeholder: 'Neuigkeiten durchsuchen',
                },
                Article: {
                    Upload_By: 'Hochgeladen von',
                    Last_Edit: 'Zuletzt bearbeitet am',
                },
                No_News: 'Aktuell keine Neuigkeiten verfügbar'
            },
            Profile: {
                Header: 'Profil',
                Container: {
                    Text: 'Gast bei',
                    Current_Table: 'Sie sitzen aktuell am Tisch Nr.',
                    My_Cart: 'Mein Warenkorb',
                    Change_Table: 'Tisch wechseln',
                }
            },
            Cart: {
                Cart_Text: 'Warenkorb',
                Empty: {
                    Text: 'Ihr Warenkorb ist leer!',
                    Subtext: 'Es befinden sich noch keine Produkte in Ihrem Warenkorb, aber keine Sorge - wir haben viele leckere Angebote!',
                    Buttons: {
                        Home_Page: {
                            Text: 'Startseite',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Menü ansehen',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Zurück',
                    Text: 'Bestellung abschließen',
                },
                Steps: {
                    Personal_Data: 'Persönliche Daten',
                    Payment: 'Zahlung',
                    Confirmation: 'Bestätigung',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Name',
                            Placeholder: 'Ihr Name',
                        },
                        Guest_Email: {
                            Label: 'E-Mail',
                            Placeholder: 'Ihre E-Mail',
                        },
                        Guest_Phone: {
                            Label: 'Telefon',
                            Placeholder: 'Ihre Telefonnummer',
                        },
                        Additional_Notes: {
                            Label: 'Zusätzliche Hinweise (optional)',
                            Placeholder: 'Gibt es etwas, das wir über Ihre Bestellung wissen sollten?',
                        },
                        Proceed_To_Payment: 'Zur Zahlung fortfahren',
                    },
                    Payment: {
                        Card_Header: 'Zahlungsmethode',
                        Selector: {
                            Header: 'Zahlungsmethode wählen',
                            options: {
                                CASH: 'Bar',
                                CARD: 'Karte',
                            }
                        },
                        View_Order: 'Bestellung prüfen',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Bestellbestätigung',
                            Subtext: 'Ihre Bestellung ist versandbereit',
                        },
                        Confirm_Order_Text: 'Bestellung bestätigen',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Bestellung erfolgreich aufgegeben!',
                            Subtext: 'Ihre Bestellung wurde erfolgreich erstellt. Bitte warten Sie, während unser Team sie bearbeitet und für Sie vorbereitet.'
                        },
                        Back_Button: 'Zurück',
                    }
                },
                Success_Element: {
                    steps: [{
                            title: "In den Warenkorb gelegt",
                            icon: "🛒"
                        },
                        {
                            title: "Bestellung erstellt",
                            icon: "📋"
                        },
                        {
                            title: "Bestellung wird bearbeitet",
                            icon: "⚙️"
                        },
                        {
                            title: "Bestellung geliefert",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Erwartete Zeit:',
                Minutes: 'Minuten',
                Have_Questions: 'Fragen? Rufen Sie uns an: ',

            },
            Validations: {
                Required_Field: 'Dieses Feld ist erforderlich!',
                Invalid_Format: 'Ungültiges Format!',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Übersetzung zurücksetzen',
                    }
                }
            },
            Discount_Box: {
                Text: 'Haben Sie einen Promo-Code?',
                Placeholder: 'Promo-Code eingeben',
                Apply_Button: 'Anwenden',
                Promo_Code: 'Promo-Code:',
                Applied_Discount: 'Angewendeter Rabatt:',
                Response_List: {
                    Invalid_Code: '❌ Ungültiger oder abgelaufener Code',
                    No_Discount_Applied: '⚠️ Der Rabatt kann nicht auf die ausgewählten Produkte angewendet werden',
                    Apply_Error: '❌ Fehler beim Anwenden des Rabatts',
                    General_Error: '⚠️ Ein Fehler ist aufgetreten, bitte versuchen Sie es erneut',
                    Success: '✅ Der Rabatt wurde erfolgreich angewendet!',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Code, Artikel und Objekt sind erforderlich',
                        INVALID_DISCOUNT_CODE: 'Ungültiger Rabattcode',
                        APPLY_DISCOUNT_ERROR: 'Der Rabatt konnte nicht angewendet werden',
                        SERVER_ERROR: 'Interner Serverfehler',
                        DISCOUNT_EXPIRED: 'Der Code ist abgelaufen',
                        DISCOUNT_NOT_APPLICABLE: 'Der Code ist für die ausgewählten Produkte nicht anwendbar',
                        DISCOUNT_ALREADY_USED: 'Der Code wurde bereits verwendet',
                        MIN_PURCHASE_REQUIRED: 'Der Mindestbestellwert für diesen Code wurde nicht erreicht'
                    }
                }
            }

        },
        fr: {
            Title: 'Menu digital de {object}',
            Header: {
                VMENU_PROMO_TEXT: 'Prise en charge et développé par V-MENU',
                Information: {
                    Text: 'Informations',
                    Modules: {
                        Wifi: {
                            Header: 'Informations WIFI',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Mot de passe',
                            }
                        },
                        Contact_Information: {
                            Header: 'Informations de contact',
                            Subtext: 'Contactez le gérant :',
                        },
                        Social_Media: {
                            Header: 'Réseaux sociaux',
                            Subtext: 'Retrouvez-nous sur les réseaux sociaux :',
                        },
                        Additional_Information: {
                            Text: 'Informations supplémentaires :',
                        }
                    },
                    Close_Button: 'Fermer',
                }
            },
            Guest: 'Invité',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Bonjour,',
                GOOD_DAY: 'Bonjour,',
                GOOD_EVENING: 'Bonsoir,',
                Products: {
                    Singular: 'Produit',
                    Plural: 'Produits'
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Appeler le serveur',
                    options: {
                        changeAshTray: 'Changer le cendrier',
                        requestBill: 'Demander l\'addition',
                        changeCutlery: 'Changer les couverts',
                        refillWater: 'Recharger l\'eau',
                        cleanTable: 'Nettoyer la table',
                        refillNapkins: 'Recharger les serviettes',
                        additionalChair: 'Chaise supplémentaire',
                        cleanSpill: 'Nettoyer le renversement',
                        additionalCondiments: 'Condiments supplémentaires',
                        requestWaiterHelp: 'Aide du serveur',
                        callManager: 'Appeler le manager',
                        reportOrderIssue: 'Signaler un problème de commande',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Choisir la langue'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Allergènes',
                        Options: {
                            NO_AVAILABLE: 'Aucun allergène dans ce produit',
                        }
                    },
                    ADDONS: {
                        Text: 'Suppléments',
                        States: {
                            Show: 'Afficher les suppléments',
                            Hide: 'Masquer les suppléments',
                            Add: 'Ajouter',
                        },
                        Options: {
                            NO_AVAILABLE: 'Aucun supplément disponible pour ce produit',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'Ajouter au panier',
                    Remove_From_Cart: 'Retirer du panier',
                }
            },
            Categories: {
                Text: 'Catégories',
                View_All: 'Voir toutes les offres',
            },
            Badges: {
                Popular: 'Populaire',
                Promoted: 'Recommandé',
                New: 'Nouveau',
            },
            Products: {
                Product_Views: 'Vues',
                Limited_Discount: 'Actuellement en promotion limitée : -{discount}% !',
                Last_Products: 'Derniers produits'

            },
            Addons: 'Suppléments',
            Total_Addons_Price: 'Prix total : {totalPrice} {currency}',
            Product_Details: 'Détails du produit',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 Autres plats de la catégorie "{category}" appréciés par nos clients...'
                }
            },
            News: {
                Header: {
                    Text: 'Actualités'
                },
                Search: {
                    Placeholder: 'Rechercher dans les actualités',
                },
                Article: {
                    Upload_By: 'Publié par',
                    Last_Edit: 'Dernière modification le',
                },
                No_News: 'Aucune actualité disponible pour le moment'
            },
            Profile: {
                Header: 'Profil',
                Container: {
                    Text: 'Invité à',
                    Current_Table: 'Vous êtes actuellement à la table n°',
                    My_Cart: 'Mon panier',
                    Change_Table: 'Changer de table',
                }
            },
            Cart: {
                Cart_Text: 'Panier',
                Empty: {
                    Text: 'Votre panier est vide !',
                    Subtext: 'Il n\'y a encore aucun produit dans votre panier, mais ne vous inquiétez pas, nous avons plein de délicieuses options !',
                    Buttons: {
                        Home_Page: {
                            Text: 'Page d\'accueil',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Voir le menu',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Retour',
                    Text: 'Finaliser la commande',
                },
                Steps: {
                    Personal_Data: 'Informations personnelles',
                    Payment: 'Paiement',
                    Confirmation: 'Confirmation',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Nom',
                            Placeholder: 'Votre nom',
                        },
                        Guest_Email: {
                            Label: 'Email',
                            Placeholder: 'Votre email',
                        },
                        Guest_Phone: {
                            Label: 'Téléphone',
                            Placeholder: 'Votre téléphone',
                        },
                        Additional_Notes: {
                            Label: 'Remarques supplémentaires (optionnel)',
                            Placeholder: 'Y a-t-il quelque chose que nous devrions savoir concernant votre commande ?',
                        },
                        Proceed_To_Payment: 'Procéder au paiement',
                    },
                    Payment: {
                        Card_Header: 'Méthode de paiement',
                        Selector: {
                            Header: 'Choisissez un mode de paiement',
                            options: {
                                CASH: 'En espèces',
                                CARD: 'Par carte',
                            }
                        },
                        View_Order: 'Vérifier la commande',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Confirmation de commande',
                            Subtext: 'Votre commande est prête à être envoyée',
                        },
                        Confirm_Order_Text: 'Confirmer la commande',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Commande passée avec succès !',
                            Subtext: 'Votre commande a été créée avec succès. Veuillez patienter pendant que notre équipe la traite et la prépare pour vous.'
                        },
                        Back_Button: 'Retour',
                    }
                },
                Success_Element: {
                    steps: [{
                            title: "Ajouté au panier",
                            icon: "🛒"
                        },
                        {
                            title: "Commande créée",
                            icon: "📋"
                        },
                        {
                            title: "Commande en traitement",
                            icon: "⚙️"
                        },
                        {
                            title: "Commande livrée",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Temps estimé :',
                Minutes: 'minutes',
                Have_Questions: 'Des questions ? Appelez-nous au : ',

            },
            Validations: {
                Required_Field: 'Ce champ est obligatoire !',
                Invalid_Format: 'Format invalide !',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Réinitialiser la traduction',
                    }
                }
            },
            Discount_Box: {
                Text: 'Vous avez un code promo ?',
                Placeholder: 'Entrez le code promo',
                Apply_Button: 'Appliquer',
                Promo_Code: 'Code promo :',
                Applied_Discount: 'Remise appliquée :',
                Response_List: {
                    Invalid_Code: '❌ Code invalide ou expiré',
                    No_Discount_Applied: '⚠️ La remise ne peut pas être appliquée aux produits sélectionnés',
                    Apply_Error: '❌ Erreur lors de l’application de la remise',
                    General_Error: '⚠️ Une erreur est survenue, veuillez réessayer',
                    Success: '✅ La remise a été appliquée avec succès !',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Code, articles et objet requis',
                        INVALID_DISCOUNT_CODE: 'Code promo invalide',
                        APPLY_DISCOUNT_ERROR: 'La remise n’a pas pu être appliquée',
                        SERVER_ERROR: 'Erreur interne du serveur',
                        DISCOUNT_EXPIRED: 'Le code a expiré',
                        DISCOUNT_NOT_APPLICABLE: 'Le code ne s’applique pas aux produits sélectionnés',
                        DISCOUNT_ALREADY_USED: 'Le code a déjà été utilisé',
                        MIN_PURCHASE_REQUIRED: 'Le montant minimum d’achat pour ce code n’a pas été atteint'
                    }
                }
            }

        },
        ru: {
            Title: 'Цифровое меню {object}',
            Header: {
                VMENU_PROMO_TEXT: 'Поддержка и разработка V-MENU',
                Information: {
                    Text: 'Информация',
                    Modules: {
                        Wifi: {
                            Header: 'Информация о WiFi',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Пароль',
                            }
                        },
                        Contact_Information: {
                            Header: 'Контактная информация',
                            Subtext: 'Свяжитесь с менеджером:',
                        },
                        Social_Media: {
                            Header: 'Социальные сети',
                            Subtext: 'Мы в социальных сетях:',
                        },
                        Additional_Information: {
                            Text: 'Дополнительная информация:',
                        }
                    },
                    Close_Button: 'Закрыть',
                }
            },
            Guest: 'Гость',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Доброе утро,',
                GOOD_DAY: 'Добрый день,',
                GOOD_EVENING: 'Добрый вечер,',
                Products: {
                    Singular: 'Продукт',
                    Plural: 'Продукты'
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Вызвать официанта',
                    options: {
                        changeAshTray: 'Заменить пепельницу',
                        requestBill: 'Попросить счет',
                        changeCutlery: 'Заменить приборы',
                        refillWater: 'Долить воду',
                        cleanTable: 'Очистить стол',
                        refillNapkins: 'Пополнить салфетки',
                        additionalChair: 'Дополнительный стул',
                        cleanSpill: 'Убрать пролитое',
                        additionalCondiments: 'Дополнительные приправы',
                        requestWaiterHelp: 'Помощь официанта',
                        callManager: 'Вызвать менеджера',
                        reportOrderIssue: 'Сообщить о проблеме с заказом',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Выбрать язык'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Аллергены',
                        Options: {
                            NO_AVAILABLE: 'В этом продукте нет аллергенов',
                        }
                    },
                    ADDONS: {
                        Text: 'Дополнения',
                        States: {
                            Show: 'Показать дополнения',
                            Hide: 'Скрыть дополнения',
                            Add: 'Добавить',
                        },
                        Options: {
                            NO_AVAILABLE: 'Нет доступных дополнений для этого продукта',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'Добавить в корзину',
                    Remove_From_Cart: 'Удалить из корзины',
                }
            },
            Categories: {
                Text: 'Категории',
                View_All: 'Посмотреть все предложения',
            },
            Badges: {
                Popular: 'Популярное',
                Promoted: 'Рекомендуем',
                New: 'Новинка',
            },
            Products: {
                Product_Views: 'Просмотры',
                Limited_Discount: 'Ограниченная скидка -{discount}%!',
                Last_Products: 'Последние продукты',

            },
            Addons: 'Дополнения',
            Total_Addons_Price: 'Общая стоимость: {totalPrice} {currency}',
            Product_Details: 'Подробности о продукте',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 Другие блюда из категории "{category}", которые нравятся нашим гостям...'
                }
            },
            News: {
                Header: {
                    Text: 'Новости'
                },
                Search: {
                    Placeholder: 'Поиск по новостям',
                },
                Article: {
                    Upload_By: 'Опубликовано',
                    Last_Edit: 'Последнее изменение',
                },
                No_News: 'Новостей пока нет'
            },
            Profile: {
                Header: 'Профиль',
                Container: {
                    Text: 'Гость в',
                    Current_Table: 'Вы находитесь за столом №',
                    My_Cart: 'Моя корзина',
                    Change_Table: 'Сменить стол',
                }
            },
            Cart: {
                Cart_Text: 'Корзина',
                Empty: {
                    Text: 'Ваша корзина пуста!',
                    Subtext: 'В вашей корзине пока нет товаров, но у нас много вкусных предложений!',
                    Buttons: {
                        Home_Page: {
                            Text: 'Главная страница',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Посмотреть меню',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Назад',
                    Text: 'Оформление заказа',
                },
                Steps: {
                    Personal_Data: 'Личные данные',
                    Payment: 'Оплата',
                    Confirmation: 'Подтверждение',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Имя',
                            Placeholder: 'Ваше имя',
                        },
                        Guest_Email: {
                            Label: 'Email',
                            Placeholder: 'Ваш email',
                        },
                        Guest_Phone: {
                            Label: 'Телефон',
                            Placeholder: 'Ваш телефон',
                        },
                        Additional_Notes: {
                            Label: 'Дополнительные заметки (необязательно)',
                            Placeholder: 'Есть ли что-то, что мы должны знать о вашем заказе?',
                        },
                        Proceed_To_Payment: 'Перейти к оплате',
                    },
                    Payment: {
                        Card_Header: 'Способ оплаты',
                        Selector: {
                            Header: 'Выберите способ оплаты',
                            options: {
                                CASH: 'Наличными',
                                CARD: 'Картой',
                            }
                        },
                        View_Order: 'Просмотр заказа',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Подтверждение заказа',
                            Subtext: 'Ваш заказ готов к отправке',
                        },
                        Confirm_Order_Text: 'Подтвердить заказ',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Заказ успешно оформлен!',
                            Subtext: 'Ваш заказ был успешно создан. Пожалуйста, подождите, пока наша команда обработает и подготовит его для вас.'
                        },
                        Back_Button: 'Вернуться назад',
                    }
                },
                Success_Element: {
                    steps: [{
                            title: "Добавлено в корзину",
                            icon: "🛒"
                        },
                        {
                            title: "Заказ создан",
                            icon: "📋"
                        },
                        {
                            title: "Обработка заказа",
                            icon: "⚙️"
                        },
                        {
                            title: "Заказ доставлен",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Ожидаемое время:',
                Minutes: 'минуты',
                Have_Questions: 'Есть вопросы? Звоните нам по номеру: ',

            },
            Validations: {
                Required_Field: 'Это поле обязательно!',
                Invalid_Format: 'Неверный формат!',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Сбросить перевод',
                    }
                }
            },
            Discount_Box: {
                Text: 'У вас есть промокод?',
                Placeholder: 'Введите промокод',
                Apply_Button: 'Применить',
                Promo_Code: 'Промокод:',
                Applied_Discount: 'Примененная скидка:',
                Response_List: {
                    Invalid_Code: '❌ Недействительный или истекший код',
                    No_Discount_Applied: '⚠️ Скидка не может быть применена к выбранным товарам',
                    Apply_Error: '❌ Ошибка при применении скидки',
                    General_Error: '⚠️ Произошла ошибка, попробуйте еще раз',
                    Success: '✅ Скидка успешно применена!',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Код, товары и объект обязательны',
                        INVALID_DISCOUNT_CODE: 'Недействительный код скидки',
                        APPLY_DISCOUNT_ERROR: 'Скидка не может быть применена',
                        SERVER_ERROR: 'Внутренняя ошибка сервера',
                        DISCOUNT_EXPIRED: 'Срок действия кода истек',
                        DISCOUNT_NOT_APPLICABLE: 'Код не применим к выбранным товарам',
                        DISCOUNT_ALREADY_USED: 'Код уже был использован',
                        MIN_PURCHASE_REQUIRED: 'Минимальная сумма покупки для этого кода не достигнута'
                    }
                }
            }

        },
        ro: {
            Title: 'Meniu digital {object}',
            Header: {
                VMENU_PROMO_TEXT: 'Susținut și dezvoltat de V-MENU',
                Information: {
                    Text: 'Informații',
                    Modules: {
                        Wifi: {
                            Header: 'Informații WiFi',
                            Fields: {
                                SSID: 'SSID',
                                Password: 'Parolă',
                            }
                        },
                        Contact_Information: {
                            Header: 'Informații de contact',
                            Subtext: 'Contactați managerul:',
                        },
                        Social_Media: {
                            Header: 'Rețele sociale',
                            Subtext: 'Găsiți-ne pe rețelele sociale:',
                        },
                        Additional_Information: {
                            Text: 'Informații suplimentare:',
                        }
                    },
                    Close_Button: 'Închide',
                }
            },
            Guest: 'Oaspete',
            System_Dynamic_Text: {
                GOOD_MORNING: 'Bună dimineața,',
                GOOD_DAY: 'Bună ziua,',
                GOOD_EVENING: 'Bună seara,',
                Products: {
                    Singular: 'Produs',
                    Plural: 'Produse'
                }
            },
            Buttons: {
                CALL_WAITER: {
                    Text: 'Cheamă chelnerul',
                    options: {
                        changeAshTray: 'Schimbă scrumiera',
                        requestBill: 'Cere nota de plată',
                        changeCutlery: 'Schimbă tacâmurile',
                        refillWater: 'Reumple apă',
                        cleanTable: 'Curăță masa',
                        refillNapkins: 'Reumple șervețele',
                        additionalChair: 'Scaun suplimentar',
                        cleanSpill: 'Curăță vărsătura',
                        additionalCondiments: 'Condimente suplimentare',
                        requestWaiterHelp: 'Cerere ajutor chelner',
                        callManager: 'Cheamă managerul',
                        reportOrderIssue: 'Raportează problemă comandă',
                    }
                },
                CHANGE_LANGUAGE: {
                    Text: 'Alege limba'
                },
                DROPDOWN_BUTTONS: {
                    ALLERGENES: {
                        Text: 'Alergeni',
                        Options: {
                            NO_AVAILABLE: 'Nu există alergeni în acest produs',
                        }
                    },
                    ADDONS: {
                        Text: 'Suplimente',
                        States: {
                            Show: 'Arată suplimente',
                            Hide: 'Ascunde suplimente',
                            Add: 'Adaugă',
                        },
                        Options: {
                            NO_AVAILABLE: 'Nu există suplimente disponibile pentru acest produs',
                        }
                    }
                },
                CART_MANAGEMENT: {
                    Add_To_Cart: 'Adaugă în coș',
                    Remove_From_Cart: 'Elimină din coș',
                }
            },
            Categories: {
                Text: 'Categorii',
                View_All: 'Vezi toate ofertele',
            },
            Badges: {
                Popular: 'Popular',
                Promoted: 'Promovat',
                New: 'Nou',
            },
            Products: {
                Product_Views: 'Vizualizări',
                Limited_Discount: 'Reducere limitată de -{discount}%!',
                Last_Products: 'Ultimele produse'

            },
            Addons: 'Suplimente',
            Total_Addons_Price: 'Preț total: {totalPrice} {currency}',
            Product_Details: 'Detalii produs',
            Marketing_Modules: {
                UpSell: {
                    FallBack_Text: '🔥 Alte preparate din categoria "{category}" apreciate de clienții noștri...'
                }
            },
            News: {
                Header: {
                    Text: 'Noutăți'
                },
                Search: {
                    Placeholder: 'Caută în noutăți',
                },
                Article: {
                    Upload_By: 'Încărcat de',
                    Last_Edit: 'Ultima editare la',
                },
                No_News: 'Nu există noutăți momentan'
            },
            Profile: {
                Header: 'Profil',
                Container: {
                    Text: 'Oaspete la',
                    Current_Table: 'Vă aflați la masa nr.',
                    My_Cart: 'Coșul meu',
                    Change_Table: 'Schimbă masa',
                }
            },
            Cart: {
                Cart_Text: 'Coș',
                Empty: {
                    Text: 'Coșul dvs. este gol!',
                    Subtext: 'Nu există produse în coșul dvs. încă, dar nu vă faceți griji, avem multe opțiuni delicioase!',
                    Buttons: {
                        Home_Page: {
                            Text: 'Pagina principală',
                            Href: PATH_LIST.APP_HOME,
                        },
                        Menu_Page: {
                            Text: 'Vezi meniul',
                            Href: PATH_LIST.CATEGORY_LIST
                        }
                    }
                }
            },
            Finalize_Order: {
                Header: {
                    Back_Button: 'Înapoi',
                    Text: 'Finalizare comandă',
                },
                Steps: {
                    Personal_Data: 'Date personale',
                    Payment: 'Plată',
                    Confirmation: 'Confirmare',
                },
                Form_Fields: {
                    Personal_Data: {
                        Guest_Name: {
                            Label: 'Nume',
                            Placeholder: 'Numele dvs.',
                        },
                        Guest_Email: {
                            Label: 'Email',
                            Placeholder: 'Email-ul dvs.',
                        },
                        Guest_Phone: {
                            Label: 'Telefon',
                            Placeholder: 'Telefonul dvs.',
                        },
                        Additional_Notes: {
                            Label: 'Observații suplimentare (opțional)',
                            Placeholder: 'Este ceva ce ar trebui să știm despre comanda dvs.?',
                        },
                        Proceed_To_Payment: 'Continuă către plată',
                    },
                    Payment: {
                        Card_Header: 'Metodă de plată',
                        Selector: {
                            Header: 'Alegeți metoda de plată',
                            options: {
                                CASH: 'Numerar',
                                CARD: 'Card',
                            }
                        },
                        View_Order: 'Vezi comanda',
                    },
                    Confirmation: {
                        Header: {
                            Text: 'Confirmare comandă',
                            Subtext: 'Comanda dvs. este gata de trimis',
                        },
                        Confirm_Order_Text: 'Confirmă comanda',
                    },
                    Success_Payment: {
                        Header: {
                            Text: 'Comandă plasată cu succes!',
                            Subtext: 'Comanda dvs. a fost creată cu succes. Vă rugăm să așteptați în timp ce echipa noastră o procesează și o pregătește pentru dvs.'
                        },
                        Back_Button: 'Înapoi',
                    }
                },
                Success_Element: {
                    steps: [{
                            title: "Adăugat în coș",
                            icon: "🛒"
                        },
                        {
                            title: "Comanda creată",
                            icon: "📋"
                        },
                        {
                            title: "Procesarea comenzii",
                            icon: "⚙️"
                        },
                        {
                            title: "Comanda livrată",
                            icon: "🚚"
                        }
                    ]
                },
                Expected_Time: 'Timp estimat:',
                Minutes: 'minute',
                Have_Questions: 'Aveți întrebări? Sunați-ne la: ',

            },
            Validations: {
                Required_Field: 'Acest câmp este obligatoriu!',
                Invalid_Format: 'Format invalid!',
            },
            API_LIST: {
                Google_Services: {
                    Reset_Options: {
                        Text: 'Resetează traducerea',
                    }
                }
            },
            Discount_Box: {
                Text: 'Aveți un cod promoțional?',
                Placeholder: 'Introduceți codul promoțional',
                Apply_Button: 'Aplică',
                Promo_Code: 'Cod promoțional:',
                Applied_Discount: 'Reducere aplicată:',
                Response_List: {
                    Invalid_Code: '❌ Cod invalid sau expirat',
                    No_Discount_Applied: '⚠️ Reducerea nu poate fi aplicată produselor selectate',
                    Apply_Error: '❌ Eroare la aplicarea reducerii',
                    General_Error: '⚠️ A apărut o eroare, încercați din nou',
                    Success: '✅ Reducerea a fost aplicată cu succes!',
                    Error_List: {
                        MISSING_REQUIRED_PARAMS: 'Codul, produsele și obiectul sunt obligatorii',
                        INVALID_DISCOUNT_CODE: 'Cod promoțional invalid',
                        APPLY_DISCOUNT_ERROR: 'Reducerea nu a putut fi aplicată',
                        SERVER_ERROR: 'Eroare internă a serverului',
                        DISCOUNT_EXPIRED: 'Codul a expirat',
                        DISCOUNT_NOT_APPLICABLE: 'Codul nu se aplică produselor selectate',
                        DISCOUNT_ALREADY_USED: 'Codul a fost deja utilizat',
                        MIN_PURCHASE_REQUIRED: 'Suma minimă de cumpărare pentru acest cod nu a fost atinsă'
                    }
                }
            }

        }
    }
}


export default localeData