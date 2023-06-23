import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
  
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await axios.post('/api/register', {
        email,
        password,
        // username,
        name,
      });

      setIsLoading(false)

      toast.success('계정이 생성되었습니다');

      signIn('credentials', {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="AJOU 이메일" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        disabled={isLoading}
        placeholder="이름 (실명)" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      {/* <Input 
        disabled={isLoading}
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
      /> */}
      <Input 
        disabled={isLoading}
        placeholder="비밀번호" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>계정이 있으신가요?
        <span 
          onClick={onToggle} 
          className="
            text-white
            cursor-pointer 
            hover:underline
          "
          > 로그인하기</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="회원 가입"
      actionLabel="회원 가입"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;