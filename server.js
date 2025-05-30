const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');

// Load environment variables
require('dotenv').config();

// LINE Channel Configuration
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

// สร้าง LINE client
const client = new line.Client(config);

// สร้าง Express app
const app = express();

// ข้อมูลรถยนต์ Ford (จากการค้นหา)
const fordData = {
  ranger: {
    name: "Ford Ranger 2024-2025",
    models: ["XL", "XLT", "Sport", "Wildtrak", "Platinum", "Raptor"],
    engines: [
      {
        type: "2.3L Turbo 4-cylinder",
        power: "270 HP",
        description: "เครื่องยนต์เบนซินเทอร์โบ 4 สูบ ขนาด 2.3 ลิตร"
      },
      {
        type: "2.7L Twin-Turbo V6",
        power: "315 HP", 
        description: "เครื่องยนต์เบนซินทวินเทอร์โบ V6 ขนาด 2.7 ลิตร"
      }
    ],
    features: [
      "Pro Trailer Backup Assist",
      "Flexible Rack System",
      "Heavy-duty suspension",
      "Automatic stop/start system"
    ],
    priceRange: "เริ่มต้น 559,000 บาท"
  },
  everest: {
    name: "Ford Everest 2024-2025",
    seating: "7 ที่นั่ง",
    variants: 7,
    engines: [
      {
        type: "2.0L Single-Turbo EcoBlue Diesel",
        power: "170 HP",
        torque: "405 Nm",
        rpmRange: "1,750-2,500 RPM"
      },
      {
        type: "3.0L V6 Diesel",
        displacement: "2993 cc",
        description: "เครื่องยนต์ดีเซล V6"
      }
    ],
    transmission: "เกียร์อัตโนมัติ",
    features: [
      "12-inch touchscreen infotainment",
      "Wireless Apple CarPlay & Android Auto", 
      "12.4-inch digital driver display",
      "Panoramic sunroof",
      "Wireless phone charging",
      "Dual-zone AC",
      "12-speaker Bang & Olufsen sound system",
      "Powered tailgate",
      "360-degree camera",
      "Bird's eye view"
    ],
    cargo: {
      normal: "259L",
      maximum: "1800L+ (เมื่อพับเบาะแถวที่ 2 และ 3)"
    },
    suspension: "Double wishbone independent front, Live axle with leaf spring rear"
  }
};

// ฟังก์ชันตอบคำถามเกี่ยวกับ Ford
function getResponseText(messageText) {
  const text = messageText.toLowerCase();
  
  // คำทักทาย
  if (text.includes('สวัสดี') || text.includes('hello') || text.includes('hi')) {
    return `สวัสดีครับ! 🚗
ยินดีต้อนรับสู่โชว์รูมฟอร์ด สาขาพระประแดง

ผมสามารถช่วยตอบคำถามเกี่ยวกับ:
🔹 Ford Ranger 2024-2025
🔹 Ford Everest 2024-2025 
🔹 สเปค เครื่องยนต์ คุณสมบัติ
🔹 ราคา และโปรโมชั่น

กรุณาถามคำถามที่สนใจได้เลยครับ!`;
  }

  // คำถามเกี่ยวกับ Ranger
  if (text.includes('ranger')) {
    if (text.includes('เครื่องยนต์') || text.includes('engine') || text.includes('สเปค')) {
      return `🚛 Ford Ranger 2024-2025 - ข้อมูลเครื่องยนต์

🔧 เครื่องยนต์ที่ 1:
• ${fordData.ranger.engines[0].type}
• กำลัง: ${fordData.ranger.engines[0].power}
• ${fordData.ranger.engines[0].description}

🔧 เครื่องยนต์ที่ 2:
• ${fordData.ranger.engines[1].type}  
• กำลัง: ${fordData.ranger.engines[1].power}
• ${fordData.ranger.engines[1].description}

📋 รุ่นที่มีจำหน่าย:
${fordData.ranger.models.join(', ')}

💰 ราคาเริ่มต้น: ${fordData.ranger.priceRange}

ต้องการข้อมูลเพิ่มเติมเรื่องไหนครับ?`;
    }
    
    if (text.includes('ราคา') || text.includes('price')) {
      return `💰 Ford Ranger 2024-2025 - ข้อมูลราคา

ราคาเริ่มต้น: ${fordData.ranger.priceRange}

📋 รุ่นที่มีจำหน่าย:
${fordData.ranger.models.map((model, index) => `${index + 1}. ${model}`).join('\n')}

📞 สำหรับราคาโปรโมชั่นล่าสุดและการจองทดลองขับ
กรุณาติดต่อ: โชว์รูมฟอร์ด พระประแดง

ต้องการข้อมูลอื่นๆ เพิ่มเติมไหมครับ?`;
    }

    return `🚛 Ford Ranger 2024-2025

${fordData.ranger.name} มีให้เลือก ${fordData.ranger.models.length} รุ่น:
${fordData.ranger.models.map((model, index) => `${index + 1}. ${model}`).join('\n')}

✨ คุณสมบัติเด่น:
${fordData.ranger.features.map(feature => `• ${feature}`).join('\n')}

💰 ราคาเริ่มต้น: ${fordData.ranger.priceRange}

ต้องการทราบข้อมูลเพิ่มเติมเรื่องไหนครับ?
- เครื่องยนต์และสเปค
- ราคาและโปรโมชั่น`;
  }

  // คำถามเกี่ยวกับ Everest
  if (text.includes('everest')) {
    if (text.includes('เครื่องยนต์') || text.includes('engine') || text.includes('สเปค')) {
      return `🚙 Ford Everest 2024-2025 - ข้อมูลเครื่องยนต์

🔧 เครื่องยนต์ที่ 1:
• ${fordData.everest.engines[0].type}
• กำลัง: ${fordData.everest.engines[0].power}
• แรงบิด: ${fordData.everest.engines[0].torque}
• ช่วงรอบ: ${fordData.everest.engines[0].rpmRange}

🔧 เครื่องยนต์ที่ 2:
• ${fordData.everest.engines[1].type}
• ขนาดเครื่องยนต์: ${fordData.everest.engines[1].displacement}

⚙️ ระบบส่งกำลัง: ${fordData.everest.transmission}
👥 ที่นั่ง: ${fordData.everest.seating}
📦 จำนวนรุ่น: ${fordData.everest.variants} รุ่น

ต้องการข้อมูลเพิ่มเติมเรื่องไหนครับ?`;
    }

    if (text.includes('คุณสมบัติ') || text.includes('feature') || text.includes('ออปชั่น')) {
      return `🚙 Ford Everest 2024-2025 - คุณสมบัติและออปชั่น

📱 ระบบสื่อสารและบันเทิง:
• ${fordData.everest.features[0]}
• ${fordData.everest.features[1]}
• ${fordData.everest.features[2]}
• ${fordData.everest.features[6]}

🏠 ความสะดวกสบาย:
• ${fordData.everest.features[3]}
• ${fordData.everest.features[4]}
• ${fordData.everest.features[5]}
• ${fordData.everest.features[7]}

🎥 ระบบความปลอดภัย:
• ${fordData.everest.features[8]}
• ${fordData.everest.features[9]}

📦 พื้นที่เก็บของ:
• ปกติ: ${fordData.everest.cargo.normal}
• สูงสุด: ${fordData.everest.cargo.maximum}

ต้องการข้อมูลอื่นๆ เพิ่มเติมไหมครับ?`;
    }

    return `🚙 Ford Everest 2024-2025

SUV ${fordData.everest.seating} สุดหรู พร้อมเทคโนโลยีล้ำสมัย

📊 ข้อมูลพื้นฐาน:
• ${fordData.everest.seating}
• ${fordData.everest.variants} รุ่นให้เลือก
• ${fordData.everest.transmission}

🎯 ไฮไลท์เด่น:
• หน้าจอสัมผัส 12 นิ้ว
• ระบบเสียง Bang & Olufsen
• กล้อง 360 องศา
• ซันรูฟพาโนรามิก

ต้องการทราบข้อมูลเพิ่มเติมเรื่องไหนครับ?
- เครื่องยนต์และสเปค  
- คุณสมบัติและออปชั่น`;
  }

  // คำถามเกี่ยวกับการติดต่อ
  if (text.includes('ติดต่อ') || text.includes('โทร') || text.includes('contact')) {
    return `📞 ติดต่อโชว์รูมฟอร์ด พระประแดง

🏢 Ford Phra Pradaeng Showroom
📍 สาขาพระประแดง

🕐 เวลาทำการ:
จันทร์ - อาทิตย์ 
08:30 - 18:00 น.

📋 บริการของเรา:
• ดูรถและทดลองขับ
• สอบถามราคาและโปรโมชั่น  
• บริการหลังการขาย
• จัดสินเชื่อ

🎯 พิเศษ! นัดหมายล่วงหน้าเพื่อรับส่วนลดพิเศษ

ต้องการนัดหมายหรือสอบถามเพิ่มเติมไหมครับ?`;
  }

  // คำถามทั่วไป
  if (text.includes('ราคา') || text.includes('price')) {
    return `💰 ราคารถยนต์ Ford 2024-2025

🚛 Ford Ranger: ${fordData.ranger.priceRange}
🚙 Ford Everest: ราคาตามรุ่นและออปชั่น

📞 สำหรับราคาโปรโมชั่นล่าสุด:
กรุณาติดต่อโชว์รูมโดยตรง

🎁 โปรโมชั่นพิเศษ:
• แลกเปลี่ยนรถเก่า
• ดาวน์ต่ำ ผ่อนนาน
• ประกันภัยฟรี
• ของแถมมากมาย

ต้องการทราบรายละเอียดโปรโมชั่นไหมครับ?`;
  }

  // คำตอบเริ่มต้น
  return `ขออภัยครับ ผมอาจไม่เข้าใจคำถามของคุณ 😅

📋 ผมสามารถช่วยตอบคำถามเหล่านี้ได้:

🚛 Ford Ranger 2024-2025:
- เครื่องยนต์และสเปค
- รุ่นและราคา
- คุณสมบัติพิเศษ

🚙 Ford Everest 2024-2025:
- เครื่องยนต์และสเปค  
- คุณสมบัติและออปชั่น
- ข้อมูลทั่วไป

📞 ข้อมูลการติดต่อโชว์รูม

กรุณาถามคำถามใหม่ หรือพิมพ์ "สวัสดี" เพื่อเริ่มต้นใหม่ครับ!`;
}

// Webhook endpoint สำหรับ LINE
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// ฟังก์ชันจัดการ event
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // ดึงข้อความจากผู้ใช้
  const userMessage = event.message.text;
  
  // สร้างข้อความตอบกลับ
  const replyMessage = {
    type: 'text',
    text: getResponseText(userMessage)
  };

  // ส่งข้อความตอบกลับ
  return client.replyMessage(event.replyToken, replyMessage);
}

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Ford LINE OA Chatbot is running! 🚗');
});

// เริ่ม server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Ford LINE OA Chatbot is listening on port ${port}`);
});
