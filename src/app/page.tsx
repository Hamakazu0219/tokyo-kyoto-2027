"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, PenSquare, Landmark, ScrollText, GraduationCap, Clock3, Target, BarChart3, CheckCircle2 } from "lucide-react";

const utokyo = {
  name: "東京大学",
  short: "東大",
  tagline: "全記述・短い解答欄で論理を圧縮する試験",
  structure: [
    "文科：現代文（評論）＋古文＋漢文＋現代文（文学的文章）",
    "理科：現代文（評論）＋古文＋漢文",
    "全問記述式",
    "100〜120字の要約系記述が軸"
  ],
  stablePoints: [
    "出題形式はかなり安定",
    "現代文評論で対比構造と要素整理が中心",
    "古文・漢文も短くまとめる説明力が必要"
  ],
  variablePoints: [
    "文科第四問は随筆だけでなく小説化も進行",
    "漢文は散文中心だが漢詩の可能性も出た",
    "古文のジャンルは説話・日記・物語へ揺れる"
  ],
  focus2027: [
    "第一問の100〜120字要約を最優先で固定化する",
    "文科志望は小説読解も含む文学的文章対策を厚くする",
    "古文は敬語主語＋和歌機能、漢文は口語訳＋要約の往復を回す"
  ],
  training: [
    { label: "現代文（評論）", value: 38 },
    { label: "古文", value: 24 },
    { label: "漢文", value: 18 },
    { label: "文学的文章", value: 20 }
  ],
  yearlyTrend: [
    { year: "2022", note: "やや難化。古文が重め。" },
    { year: "2023", note: "やや易化。古漢が比較的取り組みやすい。" },
    { year: "2024", note: "標準域。理科は古文の負荷に注意。" },
    { year: "2025", note: "概ね標準。文科第四問の小説化が印象的。" },
    { year: "2026", note: "概ね標準。漢文で漢詩が登場。" }
  ]
};

const kyoto = {
  name: "京都大学",
  short: "京大",
  tagline: "本文を材料に自分の文で説明を組み立てる試験",
  structure: [
    "文系：現代文2題＋古文1題",
    "理系：現代文2題＋古文1題",
    "全問記述式",
    "内容説明・理由説明・現代語訳が中核"
  ],
  stablePoints: [
    "大問3題・全記述の骨格は安定",
    "現代文は抽象語や比喩の言い換え力が重要",
    "古文は短くても密度が高い"
  ],
  variablePoints: [
    "文系現代文は芸術論・文学論・言語論に振れやすい",
    "理系現代文は随筆から硬質評論まで振れ幅が広い",
    "古文は歌論・日記・軍記・物語・法語集など広い"
  ],
  focus2027: [
    "設問条件を分解してから答案骨格を作る習慣を固定する",
    "比喩説明・主語補充・条件付き要約を重点反復する",
    "古文は主語補充つき現代語訳と和歌説明をセットで鍛える"
  ],
  training: [
    { label: "現代文①", value: 30 },
    { label: "現代文②", value: 28 },
    { label: "古文", value: 24 },
    { label: "答案推敲", value: 18 }
  ],
  yearlyTrend: [
    { year: "2022", note: "全記述の中で説明精度が差になる。" },
    { year: "2023", note: "芸術・言語関連の読解が引き続き軸。" },
    { year: "2024", note: "旧仮名遣いや語彙力も意識したい。" },
    { year: "2025", note: "ジャンルの固定がないこと自体が特徴。" },
    { year: "2026", note: "例年並。条件付き設問への対応力が重要。" }
  ]
};

const roadmap = [
  {
    phase: "春〜初夏",
    title: "型を知る",
    items: [
      "過去問5年分を読み、大学ごとの設問パターンを分類する",
      "答案の型を『要約』『理由説明』『対比整理』『現代語訳』に分ける",
      "東大・京大の違いを比較表で整理する"
    ]
  },
  {
    phase: "夏",
    title: "答案を作る",
    items: [
      "東大は短い字数制限の圧縮練習を増やす",
      "京大は設問条件の分解→答案骨格作成を反復する",
      "古文は主語補充、漢文は口語訳と要約を毎週回す"
    ]
  },
  {
    phase: "秋",
    title: "実戦化する",
    items: [
      "時間を測って年度別演習を行う",
      "書いた答案を削る練習で情報密度を上げる",
      "頻出テーマをまたいで言い換え語彙を増やす"
    ]
  },
  {
    phase: "冬",
    title: "最終調整",
    items: [
      "志望大学別に時間配分を固定する",
      "苦手分野だけをテーマ別に再演習する",
      "本番と同じ順番で解くルーティンを完成させる"
    ]
  }
];

const comparisonRows = [
  {
    axis: "試験の性格",
    utokyo: "短い解答欄で論理を圧縮して書く",
    kyoto: "本文を再構成して自分の文で説明する"
  },
  {
    axis: "現代文",
    utokyo: "評論の対比整理と要約が中心",
    kyoto: "抽象語・比喩・条件付き説明が中心"
  },
  {
    axis: "古文",
    utokyo: "和歌・場面把握・敬語主語",
    kyoto: "主語補充つき現代語訳と和歌・宗教語彙"
  },
  {
    axis: "漢文",
    utokyo: "散文中心だが漢詩の可能性もある",
    kyoto: "国語ではなく古文中心構成"
  },
  {
    axis: "学習の軸",
    utokyo: "短文化・圧縮・要素選別",
    kyoto: "条件整理・根拠統合・言い換え"
  }
];

const metrics = [
  {
    icon: PenSquare,
    label: "答案力",
    value: "最重要",
    desc: "両大学とも記述式。読む力だけでなく、書いてまとめる力が合否を左右。"
  },
  {
    icon: ScrollText,
    label: "古典対応",
    value: "継続必須",
    desc: "古文は両大学で差がつきやすい。東大は漢文、京大は和歌・現代語訳が鍵。"
  },
  {
    icon: Landmark,
    label: "大学別対策",
    value: "早期分岐",
    desc: "夏までに共通基礎を固め、秋以降は東大型・京大型の答案訓練へ移る。"
  }
];

function SectionTitle({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="p-2 rounded-2xl bg-slate-900 text-white">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-slate-600 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <CheckCircle2 className="w-4 h-4 mt-1 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function UniversityPanel({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow-sm border-slate-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">試験の見取り図</CardTitle>
          </CardHeader>
          <CardContent>
            <BulletList items={data.structure} />
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">2027で意識する軸</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.focus2027.map((item: string) => (
              <Badge key={item} className="mr-2 mb-2 whitespace-normal py-2 px-3 bg-slate-100 text-slate-800 hover:bg-slate-100">
                {item}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">安定しているポイント</CardTitle>
          </CardHeader>
          <CardContent>
            <BulletList items={data.stablePoints} />
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">揺れやすいポイント</CardTitle>
          </CardHeader>
          <CardContent>
            <BulletList items={data.variablePoints} />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">学習配分の目安</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.training.map((item: any) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="text-slate-500">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">直近5年の見え方</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-3">
            {data.yearlyTrend.map((item: any) => (
              <div key={item.year} className="rounded-2xl border border-slate-200 p-4 bg-white">
                <div className="text-sm font-semibold text-slate-900">{item.year}</div>
                <div className="text-sm text-slate-600 mt-2 leading-6">{item.note}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState("both");

  const currentMessage = useMemo(() => {
    if (selected === "utokyo") return utokyo.tagline;
    if (selected === "kyoto") return kyoto.tagline;
    return "東大は『圧縮』、京大は『再構成』。2027対策はこの違いを起点に設計する。";
  }, [selected]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(148,163,184,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(148,163,184,0.12),_transparent_25%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-slate-900 hover:bg-slate-900 text-white">2027年度 国語入試対策</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              東大・京大の学部入試対策を
              <span className="block">比較しながら学べるサイト</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-3xl">
              直近5年の分析をもとに、出題構造・揺れやすい論点・2027年度に向けた学習優先順位を整理しました。大学ごとの違いを見える化し、日々の学習計画まで落とし込める構成です。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-2xl">学習戦略を見る</Button>
              <Button variant="outline" className="rounded-2xl">大学別比較を見る</Button>
            </div>
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700 leading-7">
              {currentMessage}
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-14">
        <section>
          <SectionTitle
            icon={BarChart3}
            title="このサイトで押さえる3つの視点"
            subtitle="傾向把握だけで終わらせず、答案作成までつなげるための整理です。"
          />
          <div className="grid md:grid-cols-3 gap-4">
            {metrics.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className="rounded-2xl shadow-sm border-slate-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-2xl bg-slate-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary">{item.value}</Badge>
                    </div>
                    <CardTitle className="pt-2 text-lg">{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 leading-6">
                    {item.desc}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <SectionTitle
            icon={GraduationCap}
            title="大学別の特徴"
            subtitle="東大と京大の違いを見比べながら、2027年度に向けた重点を整理します。"
          />

          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant={selected === "both" ? "default" : "outline"} className="rounded-2xl" onClick={() => setSelected("both")}>両方を見る</Button>
            <Button variant={selected === "utokyo" ? "default" : "outline"} className="rounded-2xl" onClick={() => setSelected("utokyo")}>東大を見る</Button>
            <Button variant={selected === "kyoto" ? "default" : "outline"} className="rounded-2xl" onClick={() => setSelected("kyoto")}>京大を見る</Button>
          </div>

          {selected === "both" && (
            <Tabs defaultValue="utokyo" className="w-full">
              <TabsList className="grid w-full md:w-[320px] grid-cols-2 rounded-2xl">
                <TabsTrigger value="utokyo">東京大学</TabsTrigger>
                <TabsTrigger value="kyoto">京都大学</TabsTrigger>
              </TabsList>
              <TabsContent value="utokyo" className="mt-6">
                <UniversityPanel data={utokyo} />
              </TabsContent>
              <TabsContent value="kyoto" className="mt-6">
                <UniversityPanel data={kyoto} />
              </TabsContent>
            </Tabs>
          )}

          {selected === "utokyo" && <UniversityPanel data={utokyo} />}
          {selected === "kyoto" && <UniversityPanel data={kyoto} />}
        </section>

        <section>
          <SectionTitle
            icon={Target}
            title="東大・京大 比較表"
            subtitle="同じ記述式でも、求められる書き方はかなり異なります。"
          />
          <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left p-4 font-semibold">観点</th>
                      <th className="text-left p-4 font-semibold">東京大学</th>
                      <th className="text-left p-4 font-semibold">京都大学</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.axis} className="border-t border-slate-200 align-top">
                        <td className="p-4 font-medium text-slate-800">{row.axis}</td>
                        <td className="p-4 text-slate-600 leading-6">{row.utokyo}</td>
                        <td className="p-4 text-slate-600 leading-6">{row.kyoto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <SectionTitle
            icon={Clock3}
            title="2027年度に向けた学習ロードマップ"
            subtitle="年度の流れに合わせて、何を先に固めるべきかを段階的に整理しています。"
          />
          <div className="grid lg:grid-cols-4 gap-4">
            {roadmap.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="rounded-2xl shadow-sm border-slate-200 h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">{step.phase}</Badge>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BulletList items={step.items} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            icon={BookOpen}
            title="学習者向けQ&A"
            subtitle="授業・自学・添削指導にそのまま使いやすい形で要点をまとめています。"
          />
          <Card className="rounded-2xl shadow-sm border-slate-200">
            <CardContent className="pt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>最初に取り組むべきなのは東大型と京大型のどちらですか？</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-7">
                    春から夏前までは共通基礎として、現代文の要約・理由説明、古文の主語補充、漢文の口語訳を整えるのが先です。そのうえで夏以降に、東大は圧縮型、京大は再構成型へ分けて演習量を増やすのが効率的です。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>東大の文科第四問が小説化していることは重く見るべきですか？</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-7">
                    はい。随筆だけに寄せた対策では不足する可能性があります。ただし、小説でも感想ではなく本文根拠に基づく説明が求められるため、心情語の整理と行動理由の要素化が中心になります。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>京大対策で最も差がつきやすい練習は何ですか？</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-7">
                    設問条件の分解です。何を、どの範囲で、どの表現に置き換えて説明するのかを先に明確化し、その後で根拠を統合して答案にする練習が最も効果的です。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger>授業や講座で使うなら、どの部分を中心に見せると効果的ですか？</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-7">
                    まずは比較表と学習ロードマップです。入試の違いを一目で理解させたあと、実際の答案づくりにどう落とすかを示すと、学習者の行動につながりやすくなります。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
