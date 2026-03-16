# ثيم شذن - Shadan Theme

ثيم فاخر لمتاجر المجوهرات على منصة سلة (Salla)

## المميزات
- تصميم مستوحى من Luluoro (فخم وهادئ)
- ألوان: أسود غني + أبيض دافئ + ذهبي مائل
- خطوط: Playfair Display + Inter
- Animation effects: fade-in, lift, zoom, shimmer
- دعم كامل للعربية (RTL)
- Responsive على جميع الأجهزة

## طريقة التثبيت

### 1. تجهيز الملفات
```
shadan2/
├── theme.json
├── config/
│   └── settings.json
├── assets/
│   ├── css/
│   │   └── theme.css
│   ├── js/
│   │   └── theme.js
│   └── images/
└── views/
    ├── index.twig
    ├── product.twig
    ├── category.twig
    ├── cart.twig
    └── checkout.twig
```

### 2. رفع الثيم على سلة
1. اضغط المجلد `shadan2` بصيغة ZIP
2. سجل دخول على [Salla Developers](https://developers.salla.com)
3. اذهب إلى "الثيمات" → "رفع ثيم جديد"
4. ارفع ملف ZIP
5. فعل الثيم على متجرك التجريبي

### 3. إعدادات الثيم
بعد التفعيل، اذهب إلى:
- إعدادات الثيم → الألوان (يمكن تعديلها)
- إعدادات الثيم → الخطوط
- إعدادات المتجر → إضافة منتجات تجريبية

## هيكل الملفات

| الملف | الوصف |
|-------|-------|
| `theme.json` | بيانات الثيم الأساسية |
| `config/settings.json` | إعدادات الألوان والتصميم |
| `assets/css/theme.css` | أنماط CSS مع animations |
| `assets/js/theme.js` | تفاعلات JavaScript |
| `views/*.twig` | قوالب الصفحات |

## الدعم
لأي استفسار أو تعديل، تواصل مع فريق التطوير.

---

**الإصدار:** 1.0.0  
**المؤلف:** Shadan Team
