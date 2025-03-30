import React from 'react'
// 使用Unicode或Emoji符号代替react-icons
// import { BsShieldFillCheck } from 'react-icons/bs'
// import { BiSearchAlt } from 'react-icons/bi'
// import { RiHeart2Fill } from 'react-icons/ri'

interface ServiceCardProps {
  color: string
  title: string
  icon: React.ReactNode
  subtitle: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>{icon}</div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
)

const Services: React.FC = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
          我们不断改进的
          <br />
          服务
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          购买和出售加密资产的最佳选择，我们提供各种超级友好的服务
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title="安全保障"
          icon={<span className="text-white text-xl">🛡️</span>}
          subtitle="安全有保障。我们始终保持隐私并维护产品质量"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="最优汇率"
          icon={<span className="text-white text-xl">🔍</span>}
          subtitle="我们提供最优惠的交易汇率，让您的每一笔交易都物超所值"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="极速交易"
          icon={<span className="text-white text-xl">❤️</span>}
          subtitle="闪电般的交易速度，让您的资产快速到账，无需漫长等待"
        />
      </div>
    </div>
  </div>
)

export default Services
