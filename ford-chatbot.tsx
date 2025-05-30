import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Car, Info, DollarSign, Settings, Award } from 'lucide-react';

const FordChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'สวัสดีครับ! ผมคือระบบแชทบอท Ford Thailand สำหรับ Next-Gen Ranger และ Everest\n\nผมสามารถช่วยตอบคำถามเกี่ยวกับ:\n• ราคาและโปรโมชั่น\n• สเปคและฟีเจอร์\n• การเปรียบเทียบรุ่น\n• การรับประกันและบำรุงรักษา\n\nมีอะไรให้ช่วยครับ?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base for Ford Ranger and Everest
  const fordKnowledge = {
    ranger: {
      name: 'Ford Next-Gen Ranger',
      priceRange: '732,000 - 1,534,000 บาท',
      variants: [
        'Single Cab 2.0L Turbo XL 4x2 6MT',
        'Single Cab 2.0L Turbo XLS 4x2 6MT', 
        'Double Cab 2.0L Turbo XLT 4x2 6AT',
        'Double Cab 2.0L Turbo XLT 4x4 6AT',
        'Double Cab 2.0L Bi-Turbo Wildtrak 4x4 10AT',
        'Ranger Raptor 3.0L V6 Twin-Turbo EcoBoost 4x4 10AT'
      ],
      engines: [
        {
          type: '2.0L Single Turbo EcoBlue',
          power: '170 แรงม้า',
          torque: '405 นิวตัน-เมตร',
          transmission: '6MT/6AT'
        },
        {
          type: '2.0L Bi-Turbo EcoBlue', 
          power: '210 แรงม้า',
          torque: '500 นิวตัน-เมตร',
          transmission: '10AT'
        },
        {
          type: '3.0L V6 Twin-Turbo EcoBoost (Raptor)',
          power: '397 แรงม้า',
          torque: '583 นิวตัน-เมตร',
          transmission: '10AT'
        }
      ],
      features: [
        'SYNC 4A with 12" Touchscreen',
        'Digital Instrument Cluster',
        'Ford Co-Pilot360',
        'Terrain Management System',
        'Trail Control',
        'Electronic Differential Lock',
        'Hill Descent Control',
        'Adaptive Cruise Control'
      ],
      dimensions: {
        length: '5,362 มม.',
        width: '1,918 มม.',
        height: '1,884 มม.',
        wheelbase: '3,270 มม.',
        payloadCapacity: '1,000 กก.',
        towingCapacity: '3,500 กก.'
      }
    },
    everest: {
      name: 'Ford Everest',
      priceRange: '1,397,000 - 2,284,000 บาท',
      variants: [
        '2.0L Turbo Trend 4x2 6AT',
        '2.0L Turbo Titanium 4x2 6AT',
        '2.0L Bi-Turbo Sport 4x4 10AT',
        '2.0L Bi-Turbo Wildtrak 4x4 10AT',
        '2.0L Bi-Turbo Platinum 4x4 10AT',
        '2.0L Bi-Turbo Titanium+ 4x4 10AT',
        'Sport Special Edition'
      ],
      engines: [
        {
          type: '2.0L Single Turbo EcoBlue',
          power: '170 แรงม้า',
          torque: '405 นิวตัน-เมตร',
          transmission: '6AT'
        },
        {
          type: '2.0L Bi-Turbo EcoBlue',
          power: '210 แรงม้า', 
          torque: '500 นิวตัน-เมตร',
          transmission: '10AT'
        }
      ],
      features: [
        'SYNC 4A with 12" Touchscreen',
        'Digital Instrument Cluster 12.4"',
        'Ford Co-Pilot360',
        'Terrain Management System',
        'Zone Lighting',
        'Wireless Charging Pad',
        'B&O Premium Audio System',
        '360-degree Camera',
        'Hands-Free Power Tailgate'
      ],
      dimensions: {
        length: '4,914 มม.',
        width: '1,923 มม.',
        height: '1,842 มม.',
        wheelbase: '2,900 มม.',
        seating: '7 ที่นั่ง',
        towingCapacity: '3,500 กก.'
      }
    },
    warranty: {
      vehicle: '5 ปี หรือ 150,000 กม.',
      battery: '8 ปี หรือ 160,000 กม. (สำหรับรถไฮบริด)',
      paint: '3 ปี',
      perforation: '5 ปี'
    },
    service: {
      interval: 'ทุก 10,000 กม. หรือ 6 เดือน',
      servicePackage: 'Ford Service Plan ครอบคลุม 5 ครั้ง ใน 5 ปี',
      roadside: 'Ford Roadside Assistance 24/7'
    }
  };

  const getResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    // Greeting responses
    if (msg.includes('สวัสดี') || msg.includes('หวัดดี') || msg.includes('hello')) {
      return 'สวัสดีครับ! ยินดีให้คำปรึกษาเกี่ยวกับ Ford Next-Gen Ranger และ Everest ครับ มีอะไรให้ช่วยไหมครับ?';
    }
    
    // Price inquiries
    if (msg.includes('ราคา') || msg.includes('price') || msg.includes('เท่าไหร่')) {
      if (msg.includes('ranger') || msg.includes('เรนเจอร์')) {
        return `💰 **ราคา Ford Next-Gen Ranger**\n\n**ช่วงราคา:** ${fordKnowledge.ranger.priceRange}\n\n**รุ่นต่างๆ:**\n${fordKnowledge.ranger.variants.map((v, i) => `${i + 1}. ${v}`).join('\n')}\n\n*ราคาอาจแตกต่างตามโปรโมชั่นและตัวเลือกเสริม`;
      }
      if (msg.includes('everest') || msg.includes('เอเวอเรสต์')) {
        return `💰 **ราคา Ford Everest**\n\n**ช่วงราคา:** ${fordKnowledge.everest.priceRange}\n\n**รุ่นต่างๆ:**\n${fordKnowledge.everest.variants.map((v, i) => `${i + 1}. ${v}`).join('\n')}\n\n*ราคาอาจแตกต่างตามโปรโมชั่นและตัวเลือกเสริม`;
      }
      return `💰 **ราคา Ford Thailand**\n\n**Ford Next-Gen Ranger:** ${fordKnowledge.ranger.priceRange}\n**Ford Everest:** ${fordKnowledge.everest.priceRange}\n\nต้องการทราบรายละเอียดรุ่นใดเป็นพิเศษไหมครับ?`;
    }
    
    // Engine/Specs inquiries
    if (msg.includes('เครื่องยนต์') || msg.includes('สเปค') || msg.includes('engine') || msg.includes('แรงม้า')) {
      if (msg.includes('ranger') || msg.includes('เรนเจอร์')) {
        return `🔧 **เครื่องยนต์ Ford Next-Gen Ranger**\n\n${fordKnowledge.ranger.engines.map((e, i) => 
          `**${e.type}**\n• กำลัง: ${e.power}\n• แรงบิด: ${e.torque}\n• เกียร์: ${e.transmission}\n`
        ).join('\n')}\n\n**ขนาด/น้ำหนัก:**\n• ยาว x กว้าง x สูง: ${fordKnowledge.ranger.dimensions.length} x ${fordKnowledge.ranger.dimensions.width} x ${fordKnowledge.ranger.dimensions.height}\n• ฐานล้อ: ${fordKnowledge.ranger.dimensions.wheelbase}\n• น้ำหนักบรรทุก: ${fordKnowledge.ranger.dimensions.payloadCapacity}\n• น้ำหนักลาก: ${fordKnowledge.ranger.dimensions.towingCapacity}`;
      }
      if (msg.includes('everest') || msg.includes('เอเวอเรสต์')) {
        return `🔧 **เครื่องยนต์ Ford Everest**\n\n${fordKnowledge.everest.engines.map((e, i) => 
          `**${e.type}**\n• กำลัง: ${e.power}\n• แรงบิด: ${e.torque}\n• เกียร์: ${e.transmission}\n`
        ).join('\n')}\n\n**ขนาด/ความจุ:**\n• ยาว x กว้าง x สูง: ${fordKnowledge.everest.dimensions.length} x ${fordKnowledge.everest.dimensions.width} x ${fordKnowledge.everest.dimensions.height}\n• ฐานล้อ: ${fordKnowledge.everest.dimensions.wheelbase}\n• ที่นั่ง: ${fordKnowledge.everest.dimensions.seating}\n• น้ำหนักลาก: ${fordKnowledge.everest.dimensions.towingCapacity}`;
      }
    }
    
    // Features inquiries
    if (msg.includes('ฟีเจอร์') || msg.includes('อุปกรณ์') || msg.includes('feature') || msg.includes('เทคโนโลยี')) {
      if (msg.includes('ranger') || msg.includes('เรนเจอร์')) {
        return `✨ **ฟีเจอร์เด่น Ford Next-Gen Ranger**\n\n${fordKnowledge.ranger.features.map((f, i) => `• ${f}`).join('\n')}\n\n**เทคโนโลジีความปลอดภัย:**\n• Pre-Collision Assist\n• Blind Spot Information System\n• Lane Keeping System\n• Automatic Emergency Braking`;
      }
      if (msg.includes('everest') || msg.includes('เอเวอเรสต์')) {
        return `✨ **ฟีเจอร์เด่น Ford Everest**\n\n${fordKnowledge.everest.features.map((f, i) => `• ${f}`).join('\n')}\n\n**เทคโนโลจีความปลอดภัย:**\n• Pre-Collision Assist\n• Blind Spot Information System\n• Lane Keeping System\n• Automatic Emergency Braking\n• Cross Traffic Alert`;
      }
    }
    
    // Warranty inquiries
    if (msg.includes('รับประกัน') || msg.includes('warranty') || msg.includes('การันตี')) {
      return `🛡️ **การรับประกัน Ford Thailand**\n\n**รถยนต์:** ${fordKnowledge.warranty.vehicle}\n**สี:** ${fordKnowledge.warranty.paint}\n**การเจาะผุกร่อน:** ${fordKnowledge.warranty.perforation}\n\n**บริการหลังการขาย:**\n• ระยะเซอร์วิส: ${fordKnowledge.service.interval}\n• ${fordKnowledge.service.servicePackage}\n• ${fordKnowledge.service.roadside}`;
    }
    
    // Comparison inquiries
    if (msg.includes('เปรียบเทียบ') || msg.includes('compare') || msg.includes('แตกต่าง')) {
      return `🆚 **เปรียบเทียบ Ranger vs Everest**\n\n**Ford Next-Gen Ranger**\n• ประเภท: กระบะ 4 ประตู\n• ราคา: ${fordKnowledge.ranger.priceRange}\n• เน้น: ความแข็งแกร่ง การทำงาน\n• น้ำหนักบรรทุก: 1,000 กก.\n\n**Ford Everest**\n• ประเภท: SUV 7 ที่นั่ง\n• ราคา: ${fordKnowledge.everest.priceRange}\n• เน้น: ความสะดวกสบาย ครอบครัว\n• ที่นั่ง: 7 ที่นั่ง\n\n**ทั้งคู่:** ใช้แพลตฟอร์มเดียวกัน น้ำหนักลาก 3,500 กก.`;
    }
    
    // Raptor inquiries
    if (msg.includes('raptor') || msg.includes('แร็ปเตอร์')) {
      return `🦖 **Ford Ranger Raptor**\n\n**เครื่องยนต์:** 3.0L V6 Twin-Turbo EcoBoost\n**กำลัง:** 397 แรงม้า\n**แรงบิด:** 583 นิวตัน-เมตร\n**เกียร์:** 10AT 4x4\n\n**ฟีเจอร์พิเศษ:**\n• Fox Racing Shox\n• Brembo Brakes\n• BF Goodrich All-Terrain Tires\n• Rock Crawl Mode\n• Baja Mode\n• เซ็นเซอร์ Rock Crawl\n\n*รุ่นท็อปสุดสำหรับการขับขี่ออฟโรด*`;
    }
    
    // Service/Maintenance inquiries
    if (msg.includes('เซอร์วิส') || msg.includes('บำรุงรักษา') || msg.includes('service') || msg.includes('maintenance')) {
      return `🔧 **การบำรุงรักษา Ford Thailand**\n\n**ระยะเซอร์วิส:** ${fordKnowledge.service.interval}\n\n**Ford Service Plan:**\n• ครอบคลุม 5 ครั้งแรก ใน 5 ปี\n• ราคาคงที่ ไม่มีค่าใช้จ่ายเพิ่มเติม\n• รวมอะไหล่แท้และน้ำมันเครื่อง\n\n**บริการเสริม:**\n• Ford Roadside Assistance 24/7\n• Ford Mobile Service (เซอร์วิสถึงที่)\n• Ford Quick Lane (บริการด่วน)`;
    }
    
    // Promotion inquiries
    if (msg.includes('โปรโมชั่น') || msg.includes('promotion') || msg.includes('ดาวน์') || msg.includes('ผ่อน')) {
      return `🎁 **โปรโมชั่น Ford Thailand**\n\n**ขณะนี้มีโปรโมชั่น:**\n• ดาวน์เริ่มต้น 0%\n• ดอกเบียพิเศษ 0.99%\n• ของแถมมูลค่าสูง\n• Trade-in มูลค่าสูงสุด\n\n**สิทธิพิเศษ:**\n• ประกันภัยชั้น 1 ฟรี\n• ฟิล์มกรองแสงฟรี\n• พรมปูพื้นฟรี\n\n*โปรโมชั่นอาจเปลี่ยนแปลงตามช่วงเวลา กรุณาติดต่อเพื่อข้อมูลล่าสุด*`;
    }
    
    // Default response
    return `ขออภัยครับ ผมไม่เข้าใจคำถามของคุณ\n\nลองถามเกี่ยวกับ:\n• ราคา Ranger/Everest\n• สเปคเครื่องยนต์\n• ฟีเจอร์และอุปกรณ์\n• การรับประกัน\n• โปรโมชั่น\n• การเปรียบเทียบรุ่น\n\nหรือพิมพ์ "Ranger" หรือ "Everest" เพื่อดูข้อมูลทั่วไป`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      message: getResponse(input),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickButtons = [
    { text: 'ราคา Ranger', icon: DollarSign },
    { text: 'ราคา Everest', icon: DollarSign },
    { text: 'สเปค Ranger', icon: Settings },
    { text: 'ฟีเจอร์ Everest', icon: Award },
    { text: 'เปรียบเทียบ', icon: Info },
    { text: 'Ranger Raptor', icon: Car }
  ];

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Ford Thailand Assistant</h1>
            <p className="text-blue-100 text-sm">Next-Gen Ranger & Everest Specialist</p>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="p-4 bg-white border-b">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {quickButtons.map((button, index) => {
            const IconComponent = button.icon;
            return (
              <button
                key={index}
                onClick={() => setInput(button.text)}
                className="flex items-center justify-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200"
              >
                <IconComponent className="w-3 h-3" />
                <span>{button.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-white text-gray-800 rounded-bl-md shadow-md'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <div className="bg-blue-100 p-1.5 rounded-full flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.message}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="bg-blue-500 p-1.5 rounded-full flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-md">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-1.5 rounded-full">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="พิมพ์คำถามเกี่ยวกับ Ford Ranger หรือ Everest..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-colors duration-200 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500">
            Powered by Ford Thailand • สำหรับข้อมูลอย่างเป็นทางการ กรุณาติดต่อศูนย์ Ford
          </p>
        </div>
      </div>
    </div>
  );
};

export default FordChatbot;