CREATE TABLE public.sectors (id text PRIMARY KEY, name text NOT NULL, slug text UNIQUE NOT NULL, description text NOT NULL DEFAULT '', parent_id text REFERENCES public.sectors(id), icon text NOT NULL DEFAULT 'folder', display_order integer NOT NULL DEFAULT 0, status text NOT NULL DEFAULT 'published' CHECK (status IN ('published','inactive','draft')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.sectors TO anon, authenticated; GRANT ALL ON public.sectors TO service_role;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_sectors ON public.sectors FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE TABLE public.problems (problem_code text PRIMARY KEY, title text NOT NULL, status text NOT NULL DEFAULT 'published' CHECK (status IN ('published','inactive','draft')));
GRANT SELECT ON public.problems TO anon, authenticated; GRANT ALL ON public.problems TO service_role;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_problems ON public.problems FOR SELECT TO anon, authenticated USING (status='published');
CREATE TABLE public.problem_sectors (problem_code text REFERENCES public.problems(problem_code), sector_id text REFERENCES public.sectors(id), PRIMARY KEY(problem_code,sector_id));
GRANT SELECT ON public.problem_sectors TO anon, authenticated; GRANT ALL ON public.problem_sectors TO service_role;
ALTER TABLE public.problem_sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_problem_sectors ON public.problem_sectors FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.sectors s WHERE s.id=sector_id AND s.status='published') AND EXISTS (SELECT 1 FROM public.problems p WHERE p.problem_code=problem_sectors.problem_code AND p.status='published'));
CREATE INDEX problem_sectors_sector_idx ON public.problem_sectors(sector_id);
INSERT INTO public.sectors(id,name,slug,description,icon,display_order) VALUES
('game','게임·디지털 콘텐츠','game','게임 결제, 계정과 디지털 콘텐츠 이용 문제','gamepad',1),
('consumer','소비자·거래','consumer','구매, 배송, 환불과 거래 피해','shopping',2),
('finance','금융·보험','finance','금융상품, 보험과 금융 피해','landmark',3),
('tax','세금·재정','tax','세금 신고, 납부와 환급','receipt',4),
('housing','주거·부동산','housing','임대차, 보증금과 주거 문제','home',5),
('labor','노동·고용','labor','임금, 근로조건과 고용지원','briefcase',6),
('business','사업·창업','business','사업 시작, 인허가와 경영지원','store',7),
('government','행정·정부서비스','government','행정절차, 증명서와 공공서비스','building',8),
('legal','법률·분쟁','legal','권리구제, 상담과 분쟁 절차','scale',9),
('education','교육·자격','education','교육, 장학금과 자격시험','graduation',10),
('safety','안전·환경·보건','safety','생활안전, 환경과 보건 관련 문제','shield',11),
('participation','정책참여·사회제안','participation','정책 개선과 사회참여','messages',12);
INSERT INTO public.problems(problem_code,title) VALUES
('G001','해외 게임사 연락처 확인'),('G002','해외 게임사 국내대리인 확인'),('G003','게임 결제 환불 거부'),('G004','결제 후 아이템 미지급'),('G005','게임 계정 영구정지 및 이용제한'),('G006','게임 계정 해킹 및 도용'),('G007','게임 아이템 및 게임머니 임의 회수'),('G008','확률형 아이템 확률 미표시'),('G009','표시 확률과 실제 확률 불일치 의심'),('G010','확률형 아이템 정보 허위 표시'),('G011','게임 내 기만적 결제 유도'),('G012','게임 서비스 조기 종료'),('G013','유료 재화 잔액 환급 거부'),('G014','미성년자 무단 결제'),('G015','게임 이용 중 개인정보 유출'),('G016','불법 사설 서버 운영 의심'),('G017','불법 게임물 유통 의심'),('G018','게임 등급 및 표시 문제'),('G019','게임 아이템 현금거래 사기'),('G020','게임 계정 거래 사기');
INSERT INTO public.problem_sectors(problem_code,sector_id) SELECT problem_code,'game' FROM public.problems;
INSERT INTO public.problem_sectors(problem_code,sector_id) VALUES ('G003','consumer'),('G004','consumer'),('G011','consumer'),('G012','consumer'),('G013','consumer'),('G014','consumer'),('G019','consumer'),('G020','consumer');
INSERT INTO public.sectors(id,name,slug,parent_id,display_order) VALUES
('game-payment','게임 결제 및 환불','game-payment','game',1),('game-account','계정 정지 및 해킹','game-account','game',2),('game-items','게임 아이템 및 확률형 아이템','game-items','game',3),('game-content','디지털 콘텐츠 구매 및 이용 문제','game-content','game',4),('game-platform','플랫폼 서비스 분쟁','game-platform','game',5),
('consumer-shopping','온라인 쇼핑 및 배송','consumer-shopping','consumer',1),('consumer-refund','환불 및 교환','consumer-refund','consumer',2),('consumer-fraud','중고거래 사기','consumer-fraud','consumer',3),('consumer-contract','계약 불이행','consumer-contract','consumer',4),('consumer-defect','제품 하자 및 소비자 피해','consumer-defect','consumer',5),
('finance-fraud','금융사기 및 보이스피싱','finance-fraud','finance',1),('finance-insurance','보험금 지급 및 보험 분쟁','finance-insurance','finance',2),('finance-loan','대출 및 금융상품','finance-loan','finance',3),('finance-complaint','금융회사 민원','finance-complaint','finance',4),('finance-relief','금융 관련 피해구제','finance-relief','finance',5),
('tax-income','종합소득세','tax-income','tax',1),('tax-vat','부가가치세','tax-vat','tax',2),('tax-pay','세금 신고 및 납부','tax-pay','tax',3),('tax-refund','세금 환급 및 과오납','tax-refund','tax',4),('tax-process','세무 관련 행정절차','tax-process','tax',5),
('housing-deposit','임대차 및 보증금','housing-deposit','housing',1),('housing-repair','주택 하자 및 수리','housing-repair','housing',2),('housing-contract','부동산 계약','housing-contract','housing',3),('housing-dispute','전월세 분쟁','housing-dispute','housing',4),('housing-support','주거 관련 지원제도','housing-support','housing',5),
('labor-wage','임금체불','labor-wage','labor',1),('labor-contract','근로계약 및 근로조건','labor-contract','labor',2),('labor-dismissal','해고 및 퇴직','labor-dismissal','labor',3),('labor-accident','산업재해','labor-accident','labor',4),('labor-support','실업급여 및 고용지원','labor-support','labor',5),
('business-register','사업자등록','business-register','business',1),('business-permit','인허가 및 신고','business-permit','business',2),('business-startup','창업지원사업','business-startup','business',3),('business-subsidy','정부지원금','business-subsidy','business',4),('business-management','기업 운영 및 경영지원','business-management','business',5),
('government-complaint','정부 민원','government-complaint','government',1),('government-appeal','행정처분 및 이의신청','government-appeal','government',2),('government-certificate','각종 증명서','government-certificate','government',3),('government-service','공공서비스 신청','government-service','government',4),('government-welfare','복지 및 행정지원','government-welfare','government',5),
('legal-process','민사 및 형사 관련 절차','legal-process','legal',1),('legal-contract','계약 분쟁','legal-contract','legal',2),('legal-consult','법률 상담','legal-consult','legal',3),('legal-mediate','분쟁조정','legal-mediate','legal',4),('legal-relief','권리구제 절차','legal-relief','legal',5),
('education-dispute','교육기관 관련 분쟁','education-dispute','education',1),('education-scholarship','학자금 및 장학금','education-scholarship','education',2),('education-exam','국가자격시험','education-exam','education',3),('education-certificate','자격증 발급 및 갱신','education-certificate','education',4),('education-support','교육지원제도','education-support','education',5),
('safety-report','생활안전 신고','safety-report','safety',1),('safety-environment','환경오염','safety-environment','safety',2),('safety-facility','시설물 위험','safety-facility','safety',3),('safety-health','공중보건 관련 신고','safety-health','safety',4),('safety-relief','안전 관련 피해구제','safety-relief','safety',5),
('participation-petition','국민신문고','participation-petition','participation',1),('participation-policy','정책 제안','participation-policy','participation',2),('participation-assembly','국회 입법 의견','participation-assembly','participation',3),('participation-hearing','공청회 및 의견수렴','participation-hearing','participation',4),('participation-improve','공공정책 개선 제안','participation-improve','participation',5);