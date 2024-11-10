import { ITest } from '@/app/(after-login)/(nav)/test/_components/test-cards';
import { IStudentResultDetailResponse } from '@/api/exam-api';

export const DUMMY_TEST_LIST: ITest[] = [
  {
    examId: '14d9b0a0-088e-412c-aed8-2c23a074f4c2',
    creator: '우아한 해마 36543',
    title: '문제집',
    startTime: '2024-10-25T21:16:00',
    endTime: '2024-10-29T21:16:00',
    status: 'IN_PROGRESS',
    role: 'CREATOR',
    capacity: 11,
    examineeCount: 0,
    totalCorrect: null,
    questionQuantity: null,
  },
  {
    examId: 'b7f4c3e1-519c-45bb-9e0f-5d4e6f8b4a3d',
    creator: '진지한 공룡 89107',
    title: '수학 기출문제집',
    startTime: '2024-10-26T14:00:00',
    endTime: '2024-11-05T14:00:00',
    status: 'IN_PROGRESS',
    role: 'EXAMINEE',
    capacity: null,
    examineeCount: null,
    totalCorrect: 0,
    questionQuantity: 10,
  },
];

export const DUMMY_TEST_DETAIL: Record<string, ITest> = {
  '14d9b0a0-088e-412c-aed8-2c23a074f4c2': {
    examId: '14d9b0a0-088e-412c-aed8-2c23a074f4c2',
    creator: '우아한 해마 36543',
    title: '문제집',
    startTime: '2024-10-25T21:16:00',
    endTime: '2024-10-29T21:16:00',
    status: 'IN_PROGRESS',
    role: 'CREATOR',
    capacity: 11,
    examineeCount: 0,
    totalCorrect: null,
    questionQuantity: null,
  },
  'b7f4c3e1-519c-45bb-9e0f-5d4e6f8b4a3d': {
    examId: 'b7f4c3e1-519c-45bb-9e0f-5d4e6f8b4a3d',
    creator: '진지한 공룡 89107',
    title: '수학 기출문제집',
    startTime: '2024-10-26T14:00:00',
    endTime: '2024-11-05T14:00:00',
    status: 'IN_PROGRESS',
    role: 'EXAMINEE',
    capacity: null,
    examineeCount: null,
    totalCorrect: 0,
    questionQuantity: 10,
  },
};

export const DUMMY_STUDENT_RESULT_OVERVIEW = {
  examId: '14d9b0a0-088e-412c-aed8-2c23a074f4c2',
  totalQuantity: 10,
  students: [
    {
      memberId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: '화가난 비둘기 43152',
      score: 10,
      time: 120,
    },
    {
      memberId: '1c0a5f56-2718-4572-a3bc-4c963f33ffg8',
      name: '즐거운 고양이 12345',
      score: 15,
      time: 150,
    },
    {
      memberId: '5eb76d23-9785-4561-b5dc-3e876c78aa17',
      name: '신나는 강아지 67890',
      score: 8,
      time: 100,
    },
    {
      memberId: '9f2b6f67-1574-4693-b2bc-2a982d42ffb3',
      name: '느긋한 거북이 98765',
      score: 12,
      time: 130,
    },
    {
      memberId: '7d1f9e72-6723-4984-b7dc-5f7e2a43cc6b',
      name: '용감한 사자 24680',
      score: 20,
      time: 180,
    },
  ],
};

export const DUMMY_STUDENT_RESULT_DETAIL: IStudentResultDetailResponse = {
  memberName: '화가난 비둘기 43152',
  totalCorrect: 3,
  time: 120,
  questions: [
    {
      statement:
        '응용프로그램의 프로시저를 사용하여 원격 프로시저를 로컬 프로시저처럼 호출하는 방식의 미들웨어는?',
      options: [
        'WAS(Web Application Server)',
        'MOM(Message Oriented Middleware)',
        'RPC(Remote Procedure Call)',
        'ORB(Object Request Broker)',
      ],
      image: '',
      category: 'MULTIPLE',
      answer: '1',
      isCorrect: true,
      sequence: 1,
    },
    {
      statement:
        '운영체제 분석을 위해 리눅스에서 버전을 확인하고자 할 때 사용되는 명령어는?',
      options: ['ls', 'cat', 'pwd', 'uname'],
      image: '',
      category: 'MULTIPLE',
      answer: '2',
      isCorrect: false,
      sequence: 2,
    },
    {
      statement: '현행 시스템 분석에서 고려하지 않아도 되는 항목은? ',
      options: [
        ' DBMS 분석 ',
        ' 네트워크 분석 ',
        ' 운영체제 분석 ',
        ' 인적 자원 분석',
      ],
      image: '',
      category: 'MULTIPLE',
      answer: '2',
      isCorrect: true,
      sequence: 3,
    },
  ],
};
