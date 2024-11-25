const dbVersion = 11;

export function useIndexedDB() {
  const setData = <T>(key: string, values: Array<T & {key: string}>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      initializeDb().then(() => {
        const request = indexedDB.open("OdontCloud", dbVersion);

        request.onsuccess = () => {
          const db = request.result;

          if (!db.objectStoreNames.contains(key)) {
            return reject('Item não encontrado')
          }

          const transaction = db.transaction([key], "readwrite");

          // Acessa o Object Store
          const objectStore = transaction.objectStore(key);

          addItens(values, objectStore);

          transaction.oncomplete = () => {
            db.close();

            resolve(true);
          }

          transaction.onerror = () => {
            reject(request.error);
          };
        }
      }).catch((error) => {
        console.error('error', error);
        reject(error);
      });
    });
  }

  const addItens = <T>(values: Array<T & { key: string }>, objectStore: IDBObjectStore) => {
    const addNext = (index: number) => {
      if (index < values.length - 1) {
        const value = values[index];

        // Adiciona o dado ao Object Store
        const addRequest = objectStore.add(value);

        addRequest.onsuccess = () => {

          // Chama recursivamente a próxima iteração
          addNext(index + 1);
        };

        addRequest.onerror = () => {
          throw addRequest.error;
        };
      }
    };

    addNext(0);
  };

  const addItem = <T>(key: string, value: T & { key: string }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("OdontCloud", dbVersion);

      if (!Object.prototype.hasOwnProperty.call(value, 'key')) return reject('Item não encontrado');

      request.onsuccess = () => {
        const db = request.result;

        const transaction = db.transaction([key], "readwrite");
        const objectStore = transaction.objectStore(key);

        const addRequest = objectStore.add(value);

        addRequest.onsuccess = () => {
        };
        addRequest.onerror = () => {
          console.error(addRequest.error);
          reject(addRequest.error);
        };

        transaction.oncomplete = () => {
          db.close();
          resolve(true);
        };

        transaction.onerror = () => {
          console.error(transaction.error);
          reject(transaction.error);
        };
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  const updateItem = <T>(key: string, value: T & { key: string }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("OdontCloud", dbVersion);

      if (!Object.prototype.hasOwnProperty.call(value, 'key')) return reject('Item não encontrado');

      request.onsuccess = () => {
        const db = request.result;

        const transaction = db.transaction([key], "readwrite");
        const objectStore = transaction.objectStore(key);

        const addRequest = objectStore.put(value);

        addRequest.onsuccess = () => {
        };
        addRequest.onerror = () => {
          console.error(addRequest.error);
          reject(addRequest.error);
        };

        transaction.oncomplete = () => {
          db.close();
          resolve(true);
        };

        transaction.onerror = () => {
          console.error(transaction.error);
          reject(transaction.error);
        };
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  const getData = <T>(key: string): Promise<Array<T>> => {
    return new Promise((resolve, reject) => {
      initializeDb().then((newVersion: number) => {
        // Recupera dados do IndexedDB
        const request = indexedDB.open("OdontCloud", newVersion);

        request.onsuccess = () => {

          const db = request.result;

          if (!db.objectStoreNames.contains(key)) {
            return reject('Item não encontrado')
          }

          // Inicia uma transação de leitura
          const transaction = db.transaction([key], "readonly");

          // Acessa o Object Store
          const objectStore = transaction.objectStore(key);

          // Recupera todos os dados
          const getAllRequest = objectStore.getAll();

          getAllRequest.onsuccess = () => {
            return resolve(getAllRequest.result);
          };

          getAllRequest.onerror = () => {
            console.error(request.error);
            return reject(request.error);
          };

          transaction.oncomplete = () => {
            return db.close();
          };
        };

        request.onerror = () => {
          console.error(request.error);
          return reject(request.error);
        }
      }).catch((error) => {
        console.error('error', error);
        reject(error);
      });

    })
  };

  const removeData = <T>(key: string, value: T & { key: string }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("OdontCloud", dbVersion);

      if (!Object.prototype.hasOwnProperty.call(value, 'key')) return reject('Item não encontrado');

      request.onsuccess = () => {
        const db = request.result;

        const transaction = db.transaction([key], "readwrite");
        const objectStore = transaction.objectStore(key);

        const deleteRequest = objectStore.delete(value.key);

        deleteRequest.onsuccess = () => {
          resolve(true);
        };
        deleteRequest.onerror = () => {
          console.error(deleteRequest.error);
          reject(deleteRequest.error);
        };

        transaction.oncomplete = () => {
          db.close();
          resolve(true);
        };

        transaction.onerror = () => {
          console.error(deleteRequest.error);
          reject(transaction.error);
        };
      };

      request.onerror = () => {
        console.error(request.error);
        reject(request.error);
      };
    });
  };

  const deleteDatabase = () => {
    return new Promise<boolean>((resolve) => {
      // Primeiro, verifica se o método databases() está disponível
      if ('databases' in indexedDB) {
        indexedDB.databases().then((dbs) => {
          // Verifica se o banco de dados 'OdontCloud' existe
          const dbExists = dbs.some(db => db.name === 'OdontCloud');
          if (!dbExists) {
            console.warn("Banco de dados 'OdontCloud' não existe e, portanto, não pode ser excluído.");
            resolve(false); // Resolve false indicando que não havia nada para excluir
            return;
          }

          // Se o banco de dados existir, tenta excluí-lo
          const request = indexedDB.deleteDatabase("OdontCloud");

          request.onsuccess = () => {
            resolve(true);
          };

          request.onerror = () => {
            console.error("Erro ao excluir o banco de dados 'OdontCloud'.", request.error);
            resolve(false);
          };

          request.onblocked = () => {
            console.warn("A operação de exclusão do banco de dados está bloqueada.");
            resolve(true);
          };
        }).catch((error) => {
          console.error("Erro ao acessar a lista de bancos de dados.", error);
          resolve(false);
        });
      } else {
        // Se indexedDB.databases() não estiver disponível, prossegue com a tentativa de exclusão
        // Isso pode não ser ideal, pois não verifica a existência prévia do banco de dados
        resolve(false);
        throw new Error("A função indexedDB.databases() não é suportada neste navegador.");
      }
    });
  };


  const initializeDb = () => {
    return new Promise<number>((resolve, reject) => {
      // Cria ou atualiza o banco de dados e o Object Store ao criar o componente
      const request = indexedDB.open("OdontCloud", dbVersion);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains('Alimentos')) {
          // Cria ou atualiza o Object Store
          const foodStore = db.createObjectStore("Alimentos", { keyPath: "key" });
          foodStore.createIndex("id", "Alimentos", { multiEntry: true });
        }

        // if (!db.objectStoreNames.contains('Pacientes')) {
        //   // Cria ou atualiza o Object Store
        //   const patientStore = db.createObjectStore("Pacientes", { keyPath: "key" });
        //   patientStore.createIndex("id", "Pacientes", { multiEntry: true });
        // }
      };

      request.onsuccess = () => {
        resolve(dbVersion);
      };

      request.onerror = () => {
        console.error(request.error);
        reject(request.error);
      };
    })
  };

  return { getData, setData, removeData, addItem, updateItem, deleteDatabase };
}