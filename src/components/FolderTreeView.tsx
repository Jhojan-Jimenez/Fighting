import React, { useState } from 'react';
import { Folder, FolderOpen, FileImage, ChevronRight, ChevronDown, Check } from 'lucide-react';

interface FolderTreeViewProps {
  onSelectPath: (gender: string, model: string, element: string) => void;
  selectedGender: string;
  selectedModel: string;
  selectedElement: string;
}

export const FolderTreeView: React.FC<FolderTreeViewProps> = ({
  onSelectPath,
  selectedGender,
  selectedModel,
  selectedElement,
}) => {
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({
    root: true,
    HOMBRE: true,
    MUJER: true,
    H01_NEGRO_BLANCO: false,
    M01_TNT_BLANCO_ROSA: false,
  });

  const toggleNode = (nodeKey: string) => {
    setOpenNodes((prev) => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  };

  const hierarchy = [
    {
      id: 'HOMBRE',
      name: 'HOMBRE',
      count: 30,
      models: [
        { id: 'H01_NEGRO_BLANCO', code: 'H01', name: 'H01 Negro Blanco', elements: ['AGUA', 'AIRE', 'AVATAR', 'FUEGO', 'TIERRA'] },
        { id: 'H02_NEGRO_AZUL', code: 'H02', name: 'H02 Negro Azul', elements: ['AGUA', 'AIRE', 'AVATAR', 'FUEGO', 'TIERRA'] },
        { id: 'H03_NEGRO_MORADO', code: 'H03', name: 'H03 Negro Morado', elements: ['AGUA', 'AIRE', 'AVATAR', 'FUEGO', 'TIERRA'] },
        { id: 'H04_NEGRO_MARRON', code: 'H04', name: 'H04 Negro Marrón', elements: ['AGUA', 'AIRE', 'AVATAR', 'FUEGO', 'TIERRA'] },
        { id: 'H05_NEGRO_ROJO', code: 'H05', name: 'H05 Negro Rojo', elements: ['AGUA', 'AIRE', 'AVATAR', 'FUEGO', 'TIERRA'] },
        { id: 'H06_TNT_BLANCO_ROJO', code: 'H06', name: 'H06 Blanco Rojo', elements: ['AGUA', 'AIRE', 'AVATAR', 'FUEGO', 'TIERRA'] },
      ],
    },
    {
      id: 'MUJER',
      name: 'MUJER',
      count: 8,
      models: [
        { id: 'M01_TNT_BLANCO_ROSA', code: 'M01', name: 'M01 Blanco Rosa', elements: ['AGUA', 'AIRE', 'FUEGO', 'TIERRA'] },
        { id: 'M02_TNT_NEGRO_ROSA', code: 'M02', name: 'M02 Negro Rosa', elements: ['AGUA', 'AIRE', 'FUEGO', 'TIERRA'] },
      ],
    },
  ];

  return (
    <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-4 font-mono text-xs text-neutral-300 backdrop-blur-xl mb-8 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-rose-400" />
          <span className="font-bold text-white uppercase tracking-wider">
            Navegador Jerárquico de Archivos (Google Drive)
          </span>
        </div>
        <span className="text-[11px] text-neutral-400">
          Haz clic en cualquier carpeta para filtrar al instante
        </span>
      </div>

      {/* Root folder */}
      <div className="space-y-1">
        <div
          onClick={() => onSelectPath('ALL', 'ALL', 'ALL')}
          className={`flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all ${
            selectedGender === 'ALL' && selectedModel === 'ALL' && selectedElement === 'ALL'
              ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
              : 'hover:bg-neutral-800/80 text-white'
          }`}
        >
          <Folder className="w-4 h-4 text-amber-400" />
          <span>01_MOCKUPS /</span>
          <span className="text-[10px] opacity-60 ml-auto">(38 archivos totales)</span>
        </div>

        {/* Level 1: Gender */}
        <div className="pl-4 space-y-1 border-l border-white/10 ml-2">
          {hierarchy.map((genderNode) => {
            const isGenderOpen = openNodes[genderNode.id];
            const isGenderActive = selectedGender === genderNode.id;

            return (
              <div key={genderNode.id} className="space-y-1">
                <div className="flex items-center justify-between group">
                  <div
                    onClick={() => toggleNode(genderNode.id)}
                    className="p-1 rounded hover:bg-neutral-800 cursor-pointer text-neutral-400 hover:text-white"
                  >
                    {isGenderOpen ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div
                    onClick={() => onSelectPath(genderNode.id, 'ALL', 'ALL')}
                    className={`flex-1 flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer transition-all ml-1 ${
                      isGenderActive && selectedModel === 'ALL'
                        ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                        : 'hover:bg-neutral-800 text-neutral-200'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span>{genderNode.name} /</span>
                    <span className="text-[10px] text-neutral-400 ml-auto">
                      ({genderNode.count} mockups)
                    </span>
                  </div>
                </div>

                {/* Level 2: Models */}
                {isGenderOpen && (
                  <div className="pl-5 space-y-1 border-l border-white/10 ml-2">
                    {genderNode.models.map((modelNode) => {
                      const isModelOpen = openNodes[modelNode.id];
                      const isModelActive = selectedModel === modelNode.code;

                      return (
                        <div key={modelNode.id} className="space-y-1">
                          <div className="flex items-center justify-between group">
                            <div
                              onClick={() => toggleNode(modelNode.id)}
                              className="p-1 rounded hover:bg-neutral-800 cursor-pointer text-neutral-400 hover:text-white"
                            >
                              {isModelOpen ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </div>
                            <div
                              onClick={() => onSelectPath(genderNode.id, modelNode.code, 'ALL')}
                              className={`flex-1 flex items-center gap-2 py-1 px-2 rounded-lg cursor-pointer transition-all ml-1 ${
                                isModelActive && selectedElement === 'ALL'
                                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                                  : 'hover:bg-neutral-800 text-neutral-300'
                              }`}
                            >
                              <Folder className="w-3.5 h-3.5 text-sky-400" />
                              <span className="truncate">{modelNode.id} /</span>
                              <span className="text-[10px] text-neutral-400 ml-auto">
                                ({modelNode.elements.length})
                              </span>
                            </div>
                          </div>

                          {/* Level 3: Elements */}
                          {isModelOpen && (
                            <div className="pl-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 py-1">
                              {modelNode.elements.map((elem) => {
                                const isElemActive =
                                  selectedModel === modelNode.code && selectedElement === elem;

                                return (
                                  <div
                                    key={elem}
                                    onClick={() => onSelectPath(genderNode.id, modelNode.code, elem)}
                                    className={`flex items-center gap-1.5 p-1.5 rounded cursor-pointer transition-all border ${
                                      isElemActive
                                        ? 'bg-rose-500/30 text-white font-bold border-rose-400'
                                        : 'bg-black/40 border-white/5 hover:border-white/20 text-neutral-400 hover:text-white'
                                    }`}
                                  >
                                    <FileImage className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span className="text-[10px] truncate">{elem}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
