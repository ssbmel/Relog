"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { IWork } from "@/src/types/works";
import { Calendar, FileText, Info, CheckCircle2, Circle } from "lucide-react";
import { useState, useTransition } from "react";
import { updateWorkStatusAction } from "../actions/update-work";

interface WorkDetailModalProps {
  work: IWork | null;
  open: boolean;
  onClose: () => void;
}

export function WorkDetailModal({ work, open, onClose }: WorkDetailModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!work) return null;

  const isCompleted = !!work.endDate;

  const handleStatusToggle = () => {
    setError(null);
    startTransition(async () => {
      const result = await updateWorkStatusAction(
        work.id, 
        !isCompleted, 
        work.contactId
      );

      if (result.error) {
        setError(result.error);
      } else {
        // 성공 시 데이터 리프레시를 위해 모달을 닫음 (revalidate가 작동함)
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="rounded-full bg-primary/10 p-1.5 text-primary">
              <Info size={16} />
            </div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Work Detail
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">{work.title}</DialogTitle>
          <DialogDescription>
            작업의 상세 내용과 일정을 확인합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* 현재 상태 정보 */}
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              {isCompleted ? <CheckCircle2 className="text-green-500" size={18} /> : <Circle className="text-primary" size={18} />}
            </div>
            <div className="grid gap-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">진행 상태</span>
                <Button 
                  size="sm" 
                  variant={isCompleted ? "outline" : "default"}
                  className="h-8 px-3"
                  onClick={handleStatusToggle}
                  disabled={isPending}
                >
                  {isPending ? "변경 중..." : (isCompleted ? "다시 진행하기" : "완료로 표시")}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                현재 작업은 <span className="font-medium text-foreground">{isCompleted ? "완료" : "진행 중"}</span> 상태입니다.
              </p>
            </div>
          </div>

          {/* 기간 정보 */}
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <Calendar size={18} />
            </div>
            <div className="grid gap-1">
              <span className="text-sm font-semibold">진행 기간</span>
              <p className="text-sm text-muted-foreground">
                {work.startDate} ~ {work.endDate || "진행 중"}
              </p>
            </div>
          </div>

          {/* 상세 설명 */}
          <div className="flex items-start gap-4">
            <div className="mt-1 text-muted-foreground">
              <FileText size={18} />
            </div>
            <div className="grid gap-1">
              <span className="text-sm font-semibold">작업 상세 설명</span>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                  {work.description || "등록된 설명이 없습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
