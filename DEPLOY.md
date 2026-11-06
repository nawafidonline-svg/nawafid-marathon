# نشر موقع ماراثون نوافذ

نفس طريقة متجر نوافذ: GitHub ثم Railway. الموقع صفحات ثابتة فقط (بدون قاعدة بيانات)، فلا يحتاج Volume ولا متغيرات.

## 1) GitHub
1. على GitHub أنشئ مستودعًا جديدًا باسم `nawafid-marathon` (يمكن أن يكون خاصًا Private).
2. اضغط **uploading an existing file** واسحب إليها **محتوى** هذا المجلد كله
   (`index.html` و`Dockerfile` و`nginx.conf.template` ومجلد `img` ومجلدات الأساتذة `salim` و`hamiani`…)، ثم **Commit changes**.

## 2) Railway
1. railway.com ← **New Project** ← **Deploy from GitHub repo** ← اختر `nawafid-marathon`.
2. سيتعرف تلقائيًا على `Dockerfile` ويبني الموقع.
3. **Settings ← Networking ← Generate Domain** للحصول على رابط مؤقت وتجربته.

## 3) الدومين `marathon-nawafid.com` (مسجّل في Namecheap)
**في Railway:** Settings ← Networking ← **Custom Domain**
- أضف `marathon-nawafid.com`، ثم أضف `www.marathon-nawafid.com`.
- لكل واحد يعطيك Railway قيمة تنتهي بـ `.up.railway.app` (انسخها)، وقد يطلب أيضًا سجل تحقق **TXT**.

**في Namecheap:** Domain List ← `marathon-nawafid.com` ← **Manage** ← **Advanced DNS**
1. احذف سجلات صفحة الانتظار الموجودة (Parking): سجل `CNAME` للاسم `www` وسجل `URL Redirect` للاسم `@`.
2. أضف السجلات:

| Type | Host | Value |
|---|---|---|
| ALIAS Record | `@` | القيمة التي أعطاها Railway لـ `marathon-nawafid.com` |
| CNAME Record | `www` | القيمة التي أعطاها Railway لـ `www.marathon-nawafid.com` |
| TXT Record | كما يكتبه Railway (مثل `_railway-verify`) | كما يكتبه Railway |

3. احفظ. بعد دقائق إلى بضع ساعات تظهر علامة ✓ في Railway، ويعمل الموقع على `https://marathon-nawafid.com` مع HTTPS تلقائيًا.

## روابط الأساتذة بعد النشر
- `https://marathon-nawafid.com/salim` ← الأستاذ سليم مختارة
- `https://marathon-nawafid.com/hamiani` ← الأستاذ حمياني
- `https://marathon-nawafid.com/ouargli` ← الأستاذ أسامة الورقلي
- `https://marathon-nawafid.com/faidi` ← الأستاذ الفايدي
- `https://marathon-nawafid.com/sahnoun` ← الأستاذ جلال سحنون
- `https://marathon-nawafid.com/boualem` ← الأستاذ هاني بوعلام

## التحديث لاحقًا
ارفع الملفات المعدّلة إلى نفس مستودع GitHub (Upload files ثم Commit)، فيعيد Railway النشر تلقائيًا.
