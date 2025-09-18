"use client"
import React, { useState } from 'react';

interface FormData {
  cpf: string;
  email: string;
  cep: string;
  endereco: string;
  cidade: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
  couponCode: string;
}

interface FormErrors {
  cpf: boolean;
  email: boolean;
  cep: boolean;
  endereco: boolean;
  cidade: boolean;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    cpf: '',
    email: '',
    cep: '',
    endereco: '',
    cidade: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    couponCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    cpf: false,
    email: false,
    cep: false,
    endereco: false,
    cidade: false,
  });
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');

  // Formatação de CPF
  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  // Formatação de CEP
  const formatCEP = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d)/, '$1-$2');
  };

  // Formatação de cartão de crédito
  const formatCardNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // Formatação de data de validade
  const formatExpiry = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d)/, '$1/$2');
  };

  // Validação de CPF
  const validateCPF = (cpf: string): boolean => {
    const numbers = cpf.replace(/[^\d]+/g, '');
    if (numbers === '') return false;
    if (numbers.length !== 11) return false;
    
    const invalidCPFs = [
      '00000000000', '11111111111', '22222222222', '33333333333',
      '44444444444', '55555555555', '66666666666', '77777777777',
      '88888888888', '99999999999'
    ];
    
    if (invalidCPFs.includes(numbers)) return false;
    
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(numbers.charAt(9))) return false;
    
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(numbers.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(numbers.charAt(10))) return false;
    
    return true;
  };

  // Validação de e-mail
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validação de CEP
  const validateCEPFormat = (cep: string): boolean => {
    const cepPattern = /^\d{5}-\d{3}$/;
    return cepPattern.test(cep);
  };

  // Validação e aplicação do cupom
  const applyCoupon = () => {
    const coupon = formData.couponCode.toUpperCase().trim();
    setCouponError('');
    
    // Simulação de cupons válidos
    const validCoupons: { [key: string]: number } = {
      'DESCONTO10': 10.00,
      'SAVE20': 20.00,
      'PRIMEIRA15': 15.00,
      'BEM-VINDO': 25.00
    };

    if (!coupon) {
      setCouponError('Digite um código de cupom');
      return;
    }

    if (validCoupons[coupon]) {
      setCouponDiscount(validCoupons[coupon]);
      setCouponApplied(true);
    } else {
      setCouponError('Cupom inválido ou expirado');
      setCouponDiscount(0);
      setCouponApplied(false);
    }
  };

  // Remover cupom
  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponDiscount(0);
    setCouponError('');
    setFormData(prev => ({ ...prev, couponCode: '' }));
  };

  // Handler para mudanças nos inputs
  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;

    switch (field) {
      case 'cpf':
        formattedValue = formatCPF(value);
        break;
      case 'cep':
        formattedValue = formatCEP(value);
        break;
      case 'cardNumber':
        formattedValue = formatCardNumber(value);
        break;
      case 'cardExpiry':
        formattedValue = formatExpiry(value);
        break;
      case 'couponCode':
        formattedValue = value.toUpperCase();
        if (couponApplied) {
          setCouponApplied(false);
          setCouponDiscount(0);
        }
        setCouponError('');
        break;
      default:
        formattedValue = value;
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (field in errors) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  // Validação da Etapa 1
  const validateStep1 = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = true;
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setCurrentStep(2);
    }

    return isValid;
  };

  // Validação da Etapa 2
  const validateStep2 = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!validateCEPFormat(formData.cep)) {
      newErrors.cep = true;
      isValid = false;
    }

    if (formData.endereco.trim() === '') {
      newErrors.endereco = true;
      isValid = false;
    }

    if (formData.cidade.trim() === '') {
      newErrors.cidade = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setCurrentStep(3);
    }

    return isValid;
  };

  const selectPaymentMethod = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  // Finalizar compra
  const finalizePurchase = () => {
    if (!formData.paymentMethod) {
      alert('Selecione um método de pagamento');
      return;
    }

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv || !formData.cardName) {
        alert('Preencha todos os dados do cartão');
        return;
      }
    }

    alert('Compra realizada com sucesso! 🎉');
  };

  // Cálculo do total
  const subtotal = 92.19; // Soma dos produtos
  const avaliacaoMedica = 10.00;
  const descontoPrimeiroPedido = -27.06;
  const presenteManual = -10.00;
  
  const totalBeforeCoupon = subtotal + avaliacaoMedica + descontoPrimeiroPedido + presenteManual;
  const finalTotal = totalBeforeCoupon - couponDiscount;

  return (
    <div className="py-20">
      <section className="relative">
        <div className="">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-6 md:mb-10">
              <h1 className="text-2xl sm:text-3xl font-light tracking-wider text-gray-800">MINHALOGO</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
              {/* Checkout Steps */}
              <div className="xl:col-span-2 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
                {/* Etapa 1: Conta */}
                <div className={`mb-6 md:mb-8 transition-opacity duration-300 ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center mb-4 md:mb-5 pb-3 border-b border-gray-200">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 md:mr-4 font-bold text-white text-sm transition-colors duration-300 ${
                      currentStep > 1 ? 'bg-green-500' : currentStep === 1 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Conta</h2>
                  </div>
                  
                  {currentStep === 1 && (
                    <div className="pl-4 sm:pl-8 md:pl-12">
                      <div className="mb-4 md:mb-5">
                        <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">CPF</label>
                        <input
                          type="text"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          className={`w-full p-3 border-2 rounded-lg text-sm sm:text-base transition-colors ${
                            errors.cpf ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none`}
                          placeholder="000.000.000-00"
                          maxLength={14}
                        />
                        {errors.cpf && <div className="text-red-500 text-xs sm:text-sm mt-1">CPF inválido</div>}
                      </div>
                      
                      <div className="mb-4 md:mb-5">
                        <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">E-mail</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full p-3 border-2 rounded-lg text-sm sm:text-base transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none`}
                          placeholder="seu@email.com"
                        />
                        {errors.email && <div className="text-red-500 text-xs sm:text-sm mt-1">E-mail inválido</div>}
                      </div>
                      
                      <button
                        onClick={validateStep1}
                        className="w-full sm:w-auto bg-Azul cursor-pointer text-white px-6 sm:px-8 py-3 rounded-xl uppercase tracking-wider font-semibold text-sm sm:text-base hover:bg-[#0a2a47] transition-colors"
                      >
                        Continuar
                      </button>
                    </div>
                  )}
                </div>

                {/* Etapa 2: Entrega */}
                <div className={`mb-6 md:mb-8 transition-opacity duration-300 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center mb-4 md:mb-5 pb-3 border-b border-gray-200">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 md:mr-4 font-bold text-white text-sm transition-colors duration-300 ${
                      currentStep > 2 ? 'bg-green-500' : currentStep === 2 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {currentStep > 2 ? '✓' : '2'}
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Informações de Entrega</h2>
                  </div>
                  
                  {currentStep === 2 && (
                    <div className="pl-4 sm:pl-8 md:pl-12">
                      <div className="mb-4 md:mb-5">
                        <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">CEP</label>
                        <input
                          type="text"
                          value={formData.cep}
                          onChange={(e) => handleInputChange('cep', e.target.value)}
                          className={`w-full p-3 border-2 rounded-lg text-sm sm:text-base transition-colors ${
                            errors.cep ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none`}
                          placeholder="00000-000"
                          maxLength={9}
                        />
                        {errors.cep && <div className="text-red-500 text-xs sm:text-sm mt-1">CEP inválido</div>}
                      </div>
                      
                      <div className="mb-4 md:mb-5">
                        <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">Endereço</label>
                        <input
                          type="text"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange('endereco', e.target.value)}
                          className={`w-full p-3 border-2 rounded-lg text-sm sm:text-base transition-colors ${
                            errors.endereco ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none`}
                          placeholder="Rua, número"
                        />
                        {errors.endereco && <div className="text-red-500 text-xs sm:text-sm mt-1">Endereço obrigatório</div>}
                      </div>
                      
                      <div className="mb-4 md:mb-5">
                        <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">Cidade</label>
                        <input
                          type="text"
                          value={formData.cidade}
                          onChange={(e) => handleInputChange('cidade', e.target.value)}
                          className={`w-full p-3 border-2 rounded-lg text-sm sm:text-base transition-colors ${
                            errors.cidade ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none`}
                          placeholder="São Paulo"
                        />
                        {errors.cidade && <div className="text-red-500 text-xs sm:text-sm mt-1">Cidade obrigatória</div>}
                      </div>
                      
                      <button
                        onClick={validateStep2}
                        className="w-full sm:w-auto bg-Azul cursor-pointer text-white px-6 sm:px-8 py-3 rounded-xl uppercase tracking-wider font-semibold text-sm sm:text-base hover:bg-[#0a2a47] transition-colors"
                      >
                        Continuar
                      </button>
                    </div>
                  )}
                </div>

                {/* Etapa 3: Pagamento */}
                <div className={`mb-6 md:mb-8 transition-opacity duration-300 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex items-center mb-4 md:mb-5 pb-3 border-b border-gray-200">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-3 md:mr-4 font-bold text-white text-sm transition-colors duration-300 ${
                      currentStep === 3 ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      3
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Método de Pagamento</h2>
                  </div>
                  
                  {currentStep === 3 && (
                    <div className="pl-4 sm:pl-8 md:pl-12">
                      <div className="grid gap-3 mb-4 md:mb-5">
                        <div
                          onClick={() => selectPaymentMethod('pix')}
                          className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === 'pix' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-500'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="payment"
                              value="pix"
                              checked={formData.paymentMethod === 'pix'}
                              onChange={() => selectPaymentMethod('pix')}
                              className="mr-3"
                            />
                            <label className="text-sm sm:text-base cursor-pointer flex-1">PIX - Pague à vista</label>
                          </div>
                        </div>
                        
                        <div
                          onClick={() => selectPaymentMethod('card')}
                          className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === 'card' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-500'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={formData.paymentMethod === 'card'}
                              onChange={() => selectPaymentMethod('card')}
                              className="mr-3"
                            />
                            <label className="text-sm sm:text-base cursor-pointer flex-1">Cartão de Crédito - Parcele em até 6x</label>
                          </div>
                        </div>
                      </div>
                      
                      {formData.paymentMethod === 'card' && (
                        <div className="mt-4 md:mt-5">
                          <div className="mb-4 md:mb-5">
                            <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">Número do Cartão</label>
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                              placeholder="0000 0000 0000 0000"
                              maxLength={19}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-5">
                            <div>
                              <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">Validade</label>
                              <input
                                type="text"
                                value={formData.cardExpiry}
                                onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                                placeholder="MM/AA"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">CVV</label>
                              <input
                                type="text"
                                value={formData.cardCvv}
                                onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                                placeholder="000"
                                maxLength={3}
                              />
                            </div>
                          </div>
                          
                          <div className="mb-4 md:mb-5">
                            <label className="block mb-2 font-medium text-gray-600 text-sm sm:text-base">Nome no Cartão</label>
                            <input
                              type="text"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange('cardName', e.target.value)}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                              placeholder="Nome como está no cartão"
                            />
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={finalizePurchase}
                        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors mt-4 md:mt-5"
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm h-fit xl:sticky xl:top-5">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 md:mb-5 text-gray-800">Resumo da Compra</h3>
                
                <div className="space-y-3 sm:space-y-4 mb-5 md:mb-6">
                  
                  <div className="flex items-center pb-3 sm:pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg mr-3 sm:mr-4 flex items-center justify-center text-xs text-gray-500">
                      IMG
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium mb-1 text-sm sm:text-base truncate">Produto 1</div>
                      <div className="text-gray-600 text-xs sm:text-sm">R$ 23,94</div>
                    </div>
                  </div>
                </div>

                <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
                    Cupom de Desconto
                  </label>
                  <div className="">
                    <input
                      type="text"
                      value={formData.couponCode}
                      onChange={(e) => handleInputChange('couponCode', e.target.value)}
                      className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none"
                      placeholder="Digite seu cupom"
                      disabled={couponApplied}
                    />
                    {!couponApplied ? (
                      <button
                        onClick={applyCoupon}
                        className="px-3 mt-2 cursor-pointer sm:px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
                      >
                        Aplicar
                      </button>
                    ) : (
                      <button
                        onClick={removeCoupon}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors whitespace-nowrap"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  {couponError && (
                    <div className="text-red-500 text-xs sm:text-sm mt-2">{couponError}</div>
                  )}
                  {couponApplied && (
                    <div className="text-green-600 text-xs sm:text-sm mt-2 flex items-center">
                      ✓ Cupom aplicado com sucesso!
                    </div>
                  )}
                </div>
                
                <div className="space-y-1 sm:space-y-2 mb-5 md:mb-6">

                  <div className="flex justify-between py-1 text-sm sm:text-base">
                    <span className="truncate mr-2">30% OFF Primeira Pedido</span>
                    <span className="text-green-600 whitespace-nowrap">-R$ 00,0</span>
                  </div>
                  <div className="flex justify-between py-1 text-sm sm:text-base">
                    <span className="truncate mr-2">Entrega</span>
                    <span className="text-green-600 whitespace-nowrap">Grátis</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between py-1 text-sm sm:text-base">
                      <span className="truncate mr-2">Cupom {formData.couponCode}</span>
                      <span className="text-green-600 whitespace-nowrap">-R$ {couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t-2 border-gray-200">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}