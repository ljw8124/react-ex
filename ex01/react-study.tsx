import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
  useReducer,
} from "react";

// ============================================================
// PART 1. useState / useEffect
// ============================================================

// ── Counter ─────────────────────────────────────────────────
// 상태 변경 → 리렌더링 (직접 DOM 건드리지 않음)
function Counter() {
  const [count, setCount] = useState(0);

  // 함수형 업데이트: prev가 항상 최신값 보장
  const increment = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// ── UserProfile ──────────────────────────────────────────────
// useEffect 의존성 배열
// []        → 마운트 1회
// [userId]  → userId 변경 시 재실행
// 없음      → 매 렌더링마다 (거의 안 씀)

interface User {
  id: number;
  name: string;
}

interface UserProfileProps {
  userId: number;
}

function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {}); // abort 에러 무시

    // cleanup: userId 바뀌면 이전 요청 취소
    return () => controller.abort();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <p>{user?.name}</p>;
}

// ── StopWatch ────────────────────────────────────────────────
// useRef: 변경해도 리렌더링 없음 → 타이머 ID 같은 값 저장에 적합
// useRef: DOM 접근 시에도 사용
function StopWatch() {
  const [time, setTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const start = () => {
    timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
  };

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div>
      <p>{time}초</p>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
      <input ref={inputRef} placeholder="포커스 테스트" />
      <button onClick={() => inputRef.current?.focus()}>포커스</button>
    </div>
  );
}

// ============================================================
// PART 2. 컴포넌트 설계 패턴
// ============================================================

// ── Controlled Input ─────────────────────────────────────────
// state → DOM (value), DOM → state (onChange)
// 실시간 유효성 검사 / 포맷팅에 적합
function ControlledForm() {
  const [email, setEmail] = useState("");
  const isValid = email.includes("@");

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isValid && email && <p>올바른 이메일을 입력하세요</p>}
      <button type="submit" disabled={!isValid}>
        제출
      </button>
    </form>
  );
}

// ── Lifting State Up ─────────────────────────────────────────
// 두 자식이 같은 상태 공유 → 공통 부모로 상태 올리기

interface TemperatureInputProps {
  scale: "C" | "F";
  value: string;
  onChange: (val: string) => void;
}

function TemperatureInput({ scale, value, onChange }: TemperatureInputProps) {
  return (
    <div>
      <label>{scale === "C" ? "섭씨" : "화씨"}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const fahrenheit = celsius ? String((Number(celsius) * 9) / 5 + 32) : "";

  return (
    <div>
      <TemperatureInput scale="C" value={celsius} onChange={setCelsius} />
      <TemperatureInput
        scale="F"
        value={fahrenheit}
        onChange={(val) => setCelsius(String(((Number(val) - 32) * 5) / 9))}
      />
    </div>
  );
}

// ── Compound Component ───────────────────────────────────────
// <Card><Card.Header /> <Card.Body /></Card> 형태
// 내부 구조를 컴포넌트 API로 표현

type CardVariant = "default" | "elevated" | "outlined";

interface CardContextValue {
  variant: CardVariant;
}

const CardContext = createContext<CardContextValue>({ variant: "default" });

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
}

function Card({ children, variant = "default" }: CardProps) {
  return (
    <CardContext.Provider value={{ variant }}>
      <div className={`card card--${variant}`}>{children}</div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  const { variant } = useContext(CardContext);
  return <div className={`card__header card__header--${variant}`}>{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card__body">{children}</div>;
};

Card.Footer = function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="card__footer">{children}</div>;
};

// 사용:
// <Card variant="elevated">
//   <Card.Header>제목</Card.Header>
//   <Card.Body>내용</Card.Body>
// </Card>

// ── Render Props ─────────────────────────────────────────────
// 로직은 컴포넌트가, 렌더링 방식은 사용하는 쪽이 결정

interface Position {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (pos: Position) => React.ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  return <div onMouseMove={handleMouseMove}>{render(pos)}</div>;
}

// 사용:
// <MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />

// ============================================================
// PART 3. Custom Hooks
// ============================================================

// ── useFetch ─────────────────────────────────────────────────
// fetch 래퍼 → loading / error 상태까지 캡슐화
// url이 null이면 요청 안 함 (조건부 fetch)

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !!url,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

// 사용:
interface Post {
  id: number;
  title: string;
}

function PostList() {
  const { data: posts, loading, error } = useFetch<Post[]>("/api/posts");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {posts?.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}

// ── useLocalStorage ──────────────────────────────────────────
// localStorage + state 동기화
// useState 동일 인터페이스: [value, setValue]

function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    // lazy init: 마운트 1회만 실행
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (val: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = val instanceof Function ? val(prev) : val;
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key]
  );

  return [value, setStoredValue];
}

function Settings() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      현재 테마: {theme}
    </button>
  );
}

// ── useDebounce ──────────────────────────────────────────────
// value가 delay ms 동안 안 바뀌면 debouncedValue 업데이트
// 검색창처럼 연속 입력 시 API 호출 줄이기

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // 값 바뀌면 이전 타이머 취소
  }, [value, delay]);

  return debounced;
}

function SearchBox() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // query 바뀌어도 debouncedQuery 기준으로만 API 호출
  const { data: results } = useFetch<Post[]>(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      <ul>{results?.map((r) => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}

// ── useReducer ───────────────────────────────────────────────
// 연관된 state 여러 개 → 하나의 reducer로 집중 관리
// Redux 쓰기 전 단계, 패턴은 동일

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    dispatch({ type: "ADD", payload: input });
    setInput("");
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>추가</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            <span onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "DELETE", payload: todo.id })}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// PART 4. 메모이제이션
// ============================================================

// ── React.memo + useCallback ─────────────────────────────────
// 부모 리렌더링 시 자식도 따라 리렌더링되는 문제 방지
// React.memo: 같은 props면 리렌더링 스킵
// useCallback: 함수 prop 레퍼런스 유지 (없으면 매 렌더링마다 새 함수)

interface ExpensiveChildProps {
  onSave: () => void;
}

const ExpensiveChild = React.memo(({ onSave }: ExpensiveChildProps) => {
  console.log("ExpensiveChild 렌더링"); // 불필요하게 찍히면 최적화 필요
  return <button onClick={onSave}>저장</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("hello");

  // data가 안 바뀌면 onSave 재생성 안 됨 → ExpensiveChild 리렌더링 스킵
  const onSave = useCallback(() => {
    console.log("저장:", data);
  }, [data]);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
      <ExpensiveChild onSave={onSave} />
    </div>
  );
}

// ── useMemo ──────────────────────────────────────────────────
// 렌더링마다 돌기엔 무거운 계산 캐싱
// 의존성 바뀔 때만 재계산

interface HeavyCalcProps {
  numbers: number[];
  threshold: number;
}

function HeavyCalculation({ numbers, threshold }: HeavyCalcProps) {
  const result = useMemo(() => {
    return numbers.filter((n) => n > threshold).reduce((acc, n) => acc + n, 0);
  }, [numbers, threshold]); // numbers나 threshold 바뀔 때만 재계산

  return <p>합계: {result}</p>;
}

// ── 언제 최적화? ─────────────────────────────────────────────
// React.memo  → props 동일한데 자식이 계속 리렌더링될 때
// useCallback → React.memo 자식에게 함수 prop 넘길 때
// useMemo     → 실제로 느린 계산이 렌더링마다 돌 때
//
// ⚠️ 성능 문제 없으면 쓰지 마. 코드만 복잡해짐
//    측정은 React DevTools Profiler로

export {
  Counter,
  UserProfile,
  StopWatch,
  ControlledForm,
  TemperatureConverter,
  Card,
  MouseTracker,
  PostList,
  Settings,
  SearchBox,
  TodoApp,
  Parent,
  HeavyCalculation,
};
