'use client';

import { Check, Copy, Loader2, LogIn, Plus, Sparkles, User, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface RoomMember {
  id: string;
  user: { id: string; name: string | null; image: string | null };
  saint: { id: string; name: string; slug: string; imageUrl: string | null } | null;
  drawnAt: string | null;
}

interface Room {
  id: string;
  name: string;
  code: string;
  coordinator: { id: string; name: string | null };
  members: RoomMember[];
}

export function RoomDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch('/api/community');
      if (res.ok) {
        const data = await res.json();
        setRooms(data.rooms ?? []);
      }
    } catch {
      /* empty */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  async function handleCreate() {
    if (!roomName.trim()) return;
    const res = await fetch('/api/community', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: roomName }),
    });
    if (res.ok) {
      setRoomName('');
      setShowCreate(false);
      fetchRooms();
    }
  }

  async function handleJoin() {
    if (joinCode.length !== 6) return;
    const res = await fetch('/api/community/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: joinCode }),
    });
    if (res.ok) {
      setJoinCode('');
      setShowJoin(false);
      fetchRooms();
    }
  }

  async function handleDraw(roomId: string) {
    const res = await fetch('/api/community/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId }),
    });
    if (res.ok) fetchRooms();
  }

  function handleCopyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setShowCreate(true);
            setShowJoin(false);
          }}
          className="flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2.5 text-xs font-medium text-primary-foreground hover:bg-gold-dark"
        >
          <Plus className="h-3.5 w-3.5" /> Criar Sala
        </button>
        <button
          type="button"
          onClick={() => {
            setShowJoin(true);
            setShowCreate(false);
          }}
          className="flex items-center gap-1.5 rounded-xl bg-muted px-4 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted/80"
        >
          <LogIn className="h-3.5 w-3.5" /> Entrar com Código
        </button>
      </div>

      {showCreate && (
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Nome da sala (ex: Grupo de Oração)"
            maxLength={50}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-sm focus:border-gold focus:outline-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="px-3 py-1.5 text-xs text-muted-foreground"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleCreate}
              className="rounded-lg bg-gold px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              Criar
            </button>
          </div>
        </div>
      )}

      {showJoin && (
        <div className="rounded-xl bg-card p-4 shadow-sm">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
            placeholder="Código da sala (6 caracteres)"
            maxLength={6}
            className="w-full rounded-lg border border-border bg-background p-2.5 text-center text-sm tracking-widest uppercase focus:border-gold focus:outline-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowJoin(false)}
              className="px-3 py-1.5 text-xs text-muted-foreground"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleJoin}
              className="rounded-lg bg-gold px-3 py-1.5 text-xs font-medium text-primary-foreground"
            >
              Entrar
            </button>
          </div>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <Users className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">Nenhuma sala ainda.</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Crie uma sala ou entre com um código.
          </p>
        </div>
      ) : (
        rooms.map((room) => (
          <div key={room.id} className="rounded-xl bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">{room.name}</h3>
              <button
                type="button"
                onClick={() => handleCopyCode(room.code)}
                className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {copiedCode === room.code ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {room.code}
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {room.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {member.user.image ? (
                      <img
                        src={member.user.image}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">
                      {member.user.name ?? 'Peregrino'}
                    </p>
                    {member.saint ? (
                      <p className="text-[11px] text-gold">{member.saint.name}</p>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">Aguardando sorteio</p>
                    )}
                  </div>
                  {!member.saint && (
                    <button
                      type="button"
                      onClick={() => handleDraw(room.id)}
                      className="flex items-center gap-1 rounded-lg bg-gold/10 px-2 py-1 text-[10px] font-medium text-gold"
                    >
                      <Sparkles className="h-3 w-3" /> Sortear
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
